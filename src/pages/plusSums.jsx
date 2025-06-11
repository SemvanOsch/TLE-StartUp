import React, { useState, useEffect } from 'react';

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
    const [timeLeft, setTimeLeft] = useState(120);
    const [gameOver, setGameOver] = useState(false);

    const rocketPosition = { x: 50, y: 95 };
    const speed = 0.4;

    // Countdown timer
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

    // Nieuwe meteoor toevoegen
    useEffect(() => {
        if (gameOver) return;
        const interval = setInterval(() => {
            setMeteors(prev => {
                if (prev.length >= 2) return prev;
                const startX = 50 + (Math.random() * 30 - 15);
                return [...prev, { id: Date.now(), x: startX, y: 0 }];
            });
        }, 2500);
        return () => clearInterval(interval);
    }, [gameOver]);

    // Meteorieten bewegen
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
            setMeteors(prev => prev.slice(1));
            setScore(prev => prev + 1);
            setSum(generateSum());
        }
        setInput('');
    };

    const handleBackToHome = () => {
        window.location.href = '/'; // Of gebruik navigate('/') als je React Router gebruikt
    };

    return (
        <main className="relative w-full h-screen bg-background text-white overflow-hidden">
            {/* Kleine tijdbalk linksboven */}
            <div className="absolute top-2 left-2 w-[150px] h-2 bg-gray-700 rounded overflow-hidden shadow-md">
                <div
                    className="h-full bg-green-500 transition-all duration-1000"
                    style={{ width: `${(timeLeft / 120) * 100}%` }}
                />
            </div>

            {/* Vraag */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-2xl">
                Wat is {sum.a} + {sum.b}?
            </div>

            {/* Score rechtsboven */}
            <div id="score-container" className="absolute top-4 right-4 text-xl">
                Munten: {score}
            </div>

            {/* Formulier */}
            <form onSubmit={handleSubmit} className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                <input
                    type="number"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="text-black p-2 rounded"
                    autoFocus
                    disabled={gameOver}
                />
                <button
                    type="submit"
                    className="ml-2 bg-white text-black p-2 rounded"
                    disabled={gameOver}
                >
                    Antwoord
                </button>
            </form>

            {/* Meteoren */}
            {meteors.map(meteor => (
                <div
                    key={meteor.id}
                    className="absolute bg-red-600 w-8 h-8 rounded-full"
                    style={{
                        left: `${meteor.x}%`,
                        top: `${meteor.y}%`,
                        transform: 'translate(-50%, -50%)',
                        transition: 'top 0.1s linear, left 0.1s linear',
                    }}
                />
            ))}

            {/* Raket */}
            <div
                className="absolute w-12 h-12 bg-gray-300 rounded-full border border-white flex items-center justify-center text-xl"
                style={{
                    left: `${rocketPosition.x}%`,
                    top: `${rocketPosition.y}%`,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                🚀
            </div>

            {/* Game Over overlay */}
            {gameOver && (
                <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-center p-4">
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
        </main>
    );
}

export default PlusSums;
