import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import SterrenBG from "../component/sterrenBG.jsx";
import { useNavigate } from "react-router-dom";

function generateSum() {
    const a = Math.floor(Math.random() * 500);
    const b = Math.floor(Math.random() * 500);
    return { a, b, answer: a + b };
}

function PlusSums() {
    const [sum, setSum] = useState(generateSum());
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [meteors, setMeteors] = useState([]);
    const [timeLeft, setTimeLeft] = useState(60);
    const [gameOver, setGameOver] = useState(false);
    const [scoreIndicators, setScoreIndicators] = useState([]);
    const [showFadeIn, setShowFadeIn] = useState(true);
    const [isLeaving, setIsLeaving] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const rocketPosition = { x: 50, y: 95 };
    const speed = 0.15;
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/api/game/me', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                const user = await response.json();
                setUser(user);
                console.log('ingelogd', user);
                setLoading(false);
            } else {
                window.location.href = '/login';
            }
        }

        fetchUser();
    }, []);

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
                return [
                    ...prev,
                    {
                        id: Date.now(),
                        x: startX,
                        y: 0,
                        size: Math.floor(Math.random() * 50) + 30,
                        spin: Math.random() > 1 ? 'spin-left' : 'spin-right',
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
                        if (dist < 1) return null;
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
        if (parseInt(input) === sum.answer) {
            setMeteors(prev => {
                const [first, ...rest] = prev;
                if (first) {
                    const indicatorId = first.id;
                    setScoreIndicators(indicators => [
                        ...indicators,
                        { id: indicatorId, x: first.x, y: first.y }
                    ]);
                    setTimeout(() => {
                        setScoreIndicators(indicators =>
                            indicators.filter(i => i.id !== indicatorId)
                        );
                    }, 3000);
                }
                return rest;
            });
            setScore(prev => prev + 1);
            setSum(generateSum());
        }
        setInput('');
    };

    const handleBackToHome = () => {
        setIsLeaving(true);
        setGameOver(false); // reset gameOver

        setTimeout(() => {
            navigate("/", { state: { fromLevel: true } });
        }, 2300);
    };

    if (loading) return null
    return (
        <main className="relative w-full h-screen bg-background text-white overflow-hidden">
            <SterrenBG />

            {/* Tijdbalk */}
            <div className="absolute top-2 left-2 w-[150px] h-2 bg-gray-700 rounded overflow-hidden shadow-md z-40">
                <div
                    className="h-full bg-green-500 transition-all duration-1000"
                    style={{ width: `${(timeLeft / 60) * 100}%` }}
                />
            </div>

            {/* Vraag */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-5xl z-40">
                Wat is {sum.a} + {sum.b}?
            </div>

            {/* Score */}
            <div id="score-container" className="absolute top-4 right-4 text-xl z-40">
                Munten: {score}
            </div>

            {/* Input */}
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

            {/* Meteoren */}
            {meteors.map(meteor => (
                <img
                    key={meteor.id}
                    src="/meteor.png"
                    alt="Meteor"
                    className={`absolute pointer-events-none ${meteor.spin}`}
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

            {/* +1 Score Indicator */}
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

            {/* Raket met animatie */}
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
                initial={{x: '-50%'}}
                animate={isLeaving ? { y: -2000} : {}}
                transition={{ duration: 3, ease: "easeInOut" }}
            />

            {/* Game Over Overlay */}
            {gameOver && !isLeaving && (
                <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-center p-4 z-50">
                    <h2 className="text-3xl font-bold mb-4">⏰ Tijd is op!</h2>
                    <p className="text-xl mb-6">Je eindscore: <strong>{score}</strong></p>
                    <button
                        onClick={handleBackToHome}
                        className="bg-white text-black px-6 py-2 rounded hover:bg-gray-300"
                    >
                        Terug naar Home
                    </button>
                </div>
            )}

            {/* Fade-in overlay bij laden */}
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

export default PlusSums;
