import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import SterrenBG from "../component/SterrenBG.jsx";
import { useNavigate } from "react-router-dom";

// MODIFIED: Generates a subtraction problem, ensuring the result is not negative.
function generateProblem() {
    let a = Math.floor(Math.random() * 500);
    let b = Math.floor(Math.random() * 500);

    // Ensure 'a' is always the larger number to avoid negative answers
    if (a < b) {
        [a, b] = [b, a]; // Simple swap using array destructuring
    }

    return { a, b, answer: a - b };
}

function uniqueId(prefix = '') {
    return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
}

function Subtraction() {
    // RENAMED: 'sum' state is now 'problem' for clarity
    const [problem, setProblem] = useState(generateProblem());
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [meteors, setMeteors] = useState([]);
    const [timeLeft, setTimeLeft] = useState(60);
    const [gameOver, setGameOver] = useState(false);
    const [scoreIndicators, setScoreIndicators] = useState([]);
    const [showFadeIn, setShowFadeIn] = useState(true);
    const [isLeaving, setIsLeaving] = useState(false);
    const [laser, setLaser] = useState(null);

    const rocketPosition = { x: 50, y: 95 }; // Rocket's laser origin in percentages
    const speed = 0.15;
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => setShowFadeIn(false), 1000);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (gameOver) return;
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setGameOver(true);
                    addCoinsToServer();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [gameOver]);


    useEffect(() => {
        if (gameOver) return;
        const interval = setInterval(() => {
            setMeteors(prev => {
                if (prev.length >= 2) return prev;
                const startX = 50 + (Math.random() * 30 - 15);
                const id = uniqueId('meteor-');
                return [
                    ...prev,
                    {
                        id,
                        x: startX,
                        y: 0,
                        size: Math.floor(Math.random() * 50) + 30,
                        spin: Math.random() > 0.5 ? 'spin-left' : 'spin-right',
                    },
                ];
            });
        }, 2500);
        return () => clearInterval(interval);
    }, [gameOver]);

    useEffect(() => {
        if (gameOver) return;
        const interval = setInterval(() => {
            setMeteors(prev =>
                prev
                    .map(m => {
                        const dx = rocketPosition.x - m.x;
                        const dy = rocketPosition.y - m.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 1) {
                            setGameOver(true);
                            return null;
                        }
                        const vx = (dx / dist) * speed;
                        const vy = (dy / dist) * speed;
                        return { ...m, x: m.x + vx, y: m.y + vy };
                    })
                    .filter(Boolean)
            );
        }, 100);
        return () => clearInterval(interval);
    }, [gameOver]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (gameOver || !input) return;

        // MODIFIED: Check against the problem's answer
        if (parseInt(input) === problem.answer) {
            const meteorToDestroy = meteors[0];

            if (meteorToDestroy) {
                setLaser({
                    id: uniqueId('laser-'),
                    fromX: rocketPosition.x,
                    fromY: rocketPosition.y,
                    toX: meteorToDestroy.x,
                    toY: meteorToDestroy.y,
                });

                const scoreId = uniqueId('score-');
                setScoreIndicators(indicators => [
                    ...indicators,
                    { id: scoreId, x: meteorToDestroy.x, y: meteorToDestroy.y }
                ]);
                setTimeout(() => {
                    setScoreIndicators(indicators => indicators.filter(i => i.id !== scoreId));
                }, 1000);

                setTimeout(() => {
                    setMeteors(prev => prev.filter(m => m.id !== meteorToDestroy.id));
                    setScore(prev => prev + 1);
                }, 100);

                setTimeout(() => setLaser(null), 300);
            } else {
                setScore(prev => prev + 1);
            }
            // MODIFIED: Generate a new subtraction problem
            setProblem(generateProblem());
        }
        setInput('');
    };

    const handleBackToHome = () => {
        setIsLeaving(true);
        setGameOver(false);
        setTimeout(() => {
            navigate("/levels");
        }, 2300);
    };

    async function addCoinsToServer() {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://planeetwiskunde-backend.onrender.com/api/game/me/coins', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ amount: score })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Coins added:", data.coins);
            } else {
                console.error('Failed to add coins');
            }
        } catch (error) {
            console.error("Error adding coins:", error);
        }
    }

    return (
        <main className="relative w-full h-screen bg-background text-white overflow-hidden">
            <SterrenBG />

            {/* Timer Bar */}
            <div className="absolute top-2 left-2 w-[150px] h-2 bg-gray-700 rounded overflow-hidden shadow-md z-40">
                <div
                    className="h-full bg-green-500 transition-all duration-1000"
                    style={{ width: `${(timeLeft / 60) * 100}%` }}
                />
            </div>

            {/* MODIFIED: Question display */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-5xl z-40">
                Wat is {problem.a} - {problem.b}?
            </div>

            {/* Score */}
            <div className="absolute top-4 right-4 text-xl z-40">
                Munten: {score}
            </div>

            {/* Answer Input */}
            <form
                onSubmit={handleSubmit}
                className="absolute flex items-center gap-2"
                style={{
                    bottom: '5px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 40,
                }}
            >
                <input
                    type="number"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                    autoFocus
                    disabled={gameOver}
                    placeholder="Jouw antwoord"
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50"
                    disabled={gameOver}
                >
                    Antwoord
                </button>
            </form>

            {/* Meteors */}
            <AnimatePresence>
                {meteors.map(meteor => (
                    <motion.img
                        key={meteor.id}
                        src="/meteor.png"
                        alt="Meteor"
                        className={`absolute pointer-events-none ${meteor.spin}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                        style={{
                            left: `${meteor.x}%`,
                            top: `${meteor.y}%`,
                            width: `${meteor.size}px`,
                            height: `${meteor.size}px`,
                            transform: 'translate(-50%, -50%)',
                            transition: 'top 0.1s linear, left 0.1s linear',
                            zIndex: 10,
                        }}
                    />
                ))}
            </AnimatePresence>


            {/* Laser Beam using SVG */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 25 }}>
                <AnimatePresence>
                    {laser && (
                        <svg className="w-full h-full">
                            <motion.line
                                key={laser.id}
                                x1={`${laser.fromX}%`}
                                y1={`${laser.fromY}%`}
                                x2={`${laser.toX}%`}
                                y2={`${laser.toY}%`}
                                stroke="hsl(0, 100%, 50%)"
                                strokeWidth="4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.1 }}
                            />
                            <motion.line
                                key={`${laser.id}-glow`}
                                x1={`${laser.fromX}%`}
                                y1={`${laser.fromY}%`}
                                x2={`${laser.toX}%`}
                                y2={`${laser.toY}%`}
                                stroke="hsl(0, 100%, 70%)"
                                strokeWidth="12"
                                strokeLinecap="round"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.1 }}
                            />
                        </svg>
                    )}
                </AnimatePresence>
            </div>


            {/* +1 Indicator */}
            {scoreIndicators.map(indicator => (
                <div
                    key={indicator.id}
                    className="absolute text-green-400 font-bold text-xl animate-pulse"
                    style={{
                        left: `${indicator.x}%`,
                        top: `${indicator.y}%`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 20,
                    }}
                >
                    +1
                </div>
            ))}

            {/* Rocket */}
            <motion.img
                src="/testRaket.png"
                alt="Raket"
                className="absolute"
                style={{
                    left: '50%',
                    top: 'calc(100% - 200px)',
                    transform: 'translate(-50%, 0)',
                    width: '280px',
                    height: '350px',
                    pointerEvents: 'none',
                    zIndex: 30,
                }}
                initial={{ x: '-50%' }}
                animate={isLeaving ? { y: -2000 } : {}}
                transition={{ duration: 3, ease: "easeInOut" }}
            />

            {/* Game Over */}
            {gameOver && !isLeaving && (
                <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-center p-4 z-50">
                    <h2 className="text-3xl font-bold mb-4">⏰ Tijd is op!</h2>
                    <p className="text-xl mb-6">Je eindscore: <strong>{score}</strong></p>
                    <button
                        onClick={handleBackToHome}
                        className="bg-white text-black px-6 py-2 rounded hover:bg-gray-300"
                    >
                        Terug naar Level Selectie
                    </button>
                </div>
            )}

            {/* Fade-in */}
            {showFadeIn && (
                <motion.div
                    className="fixed inset-0 bg-background z-50"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                />
            )}

            {isLeaving && (
                <motion.div
                    className="fixed inset-0 bg-background z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 1, ease: "easeInOut" }}
                />
            )}
        </main>
    );
}

export default Subtraction;