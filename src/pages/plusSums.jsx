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

    // Raketpositie waar meteorieten naartoe vliegen (in percentages)
    const rocketPosition = { x: 50, y: 95 };

    const speed = 0.4;

    // Nieuwe meteoor toevoegen
    useEffect(() => {
        const interval = setInterval(() => {
            setMeteors(prev => {
                if (prev.length >= 2) return prev;

                const startX = 50 + (Math.random() * 30 - 15);
                const newMeteor = {
                    id: Date.now(),
                    x: startX,
                    y: 0,
                };

                return [...prev, newMeteor];
            });
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    // Meteorieten bewegen naar raket
    useEffect(() => {
        const interval = setInterval(() => {
            setMeteors(prev =>
                prev
                    .map(m => {
                        const dx = rocketPosition.x - m.x;
                        const dy = rocketPosition.y - m.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < 1) return null; // Meteoor is "geraakt"

                        // Richtingsvector normaliseren
                        const vx = (dx / dist) * speed;
                        const vy = (dy / dist) * speed;

                        return {
                            ...m,
                            x: m.x + vx,
                            y: m.y + vy,
                        };
                    })
                    .filter(Boolean) // verwijder null (geraakte meteoren)
            );
        }, 100);

        return () => clearInterval(interval);
    }, []);

    // Behandel antwoord
    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseInt(input) === sum.answer) {
            setMeteors(prev => prev.slice(1));
            setScore(score + 1);
            setSum(generateSum());
            setInput('');
        } else {
            setInput('');
        }
    };

    return (
        <main className="relative w-full h-screen bg-background text-white overflow-hidden">
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-2xl">
                Wat is {sum.a} + {sum.b}?
            </div>

            <form onSubmit={handleSubmit} className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                <input
                    type="number"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="text-black p-2 rounded"
                    autoFocus
                />
                <button type="submit" className="ml-2 bg-white text-black p-2 rounded">Antwoord</button>
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

            {/* Raketplek */}
            <div
                className="absolute w-12 h-12 bg-gray-300 rounded-full border border-white"
                style={{
                    left: `${rocketPosition.x}%`,
                    top: `${rocketPosition.y}%`,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                🚀
            </div>
        </main>
    );
}

export default PlusSums;
