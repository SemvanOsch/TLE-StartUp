import React, { useState, useEffect } from 'react';

function generateSum() {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    return { a, b, answer: a + b };
}

function PlusSums() {
    const [sum, setSum] = useState(generateSum());
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [meteors, setMeteors] = useState([]);

    // Constante snelheid: van y=0 naar y=100 in 10 seconden
    // Interval update elke 100ms, dus 100 updates per 10 seconden
    const speedY = 100 / (10 * 10); // = 1% per 100ms

    // Nieuwe meteoor toevoegen, max 3 tegelijk
    useEffect(() => {
        const interval = setInterval(() => {
            setMeteors(prev => {
                if (prev.length >= 3) return prev;

                // Meteoor start x rondom midden +/- 15%
                const startX = 50 + (Math.random() * 30 - 15);

                const newMeteor = {
                    id: Date.now(),
                    x: startX,
                    y: 0,
                };

                return [...prev, newMeteor];
            });
        }, 3000); // elke 3 seconden een nieuwe meteor

        return () => clearInterval(interval);
    }, []);

    // Meteoren bewegen
    useEffect(() => {
        const interval = setInterval(() => {
            setMeteors(prev =>
                prev
                    .map(m => ({ ...m, y: m.y + speedY }))
                    .filter(m => {
                        if (m.y >= 100) {
                            setGameOver(true);
                            return false;
                        }
                        return true;
                    })
            );
        }, 100);

        return () => clearInterval(interval);
    }, [speedY]);

    // Behandel antwoord
    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseInt(input) === sum.answer) {
            // Verwijder de eerste meteor (dichtstbijzijnde)
            setMeteors(prev => prev.slice(1));
            setScore(score + 1);
            setSum(generateSum());
            setInput('');
            if (score + 1 >= 10) {
                setGameOver(true);
            }
        } else {
            setInput('');
        }
    };

    if (gameOver) {
        return (
            <main className="p-4 text-center">
                <h1 className="text-2xl">{score >= 10 ? "🎉 Level gehaald!" : "💥 Game Over"}</h1>
            </main>
        );
    }

    return (
        <main className="relative w-full h-screen bg-background text-white overflow-hidden">
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-2xl">
                Wat is {sum.a} + {sum.b}?
            </div>

            <form onSubmit={handleSubmit} className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
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
                        transform: 'translateX(-50%)',
                        transition: 'top 0.1s linear',
                    }}
                />
            ))}
        </main>
    );
}

export default PlusSums;
