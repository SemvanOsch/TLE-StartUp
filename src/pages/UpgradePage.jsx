import { useState, useEffect } from 'react';
import upgradeButton20 from '/src/images/upgrade20.png';
import upgradeButton20disabled from '/src/images/upgrade20disabled.png';

const UpgradePage = () => {
    const [money, setMoney] = useState(20);
    const [currentButton, setCurrentButton] = useState(
        money >= 14 ? upgradeButton20 : upgradeButton20disabled
    );

    // Overlay fade-in control
    const [fadeOverlayVisible, setFadeOverlayVisible] = useState(true);

    useEffect(() => {
        // Fade away the white overlay shortly after mount
        const timeout = setTimeout(() => {
            setFadeOverlayVisible(false);
        }, 100); // Slight delay for smoother feel

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        setCurrentButton(money >= 14 ? upgradeButton20 : upgradeButton20disabled);
    }, [money]);

    return (
        <div className="relative min-h-screen bg-background text-text flex flex-col items-center justify-center overflow-hidden">

            {/* Fade-in white overlay */}
            <div
                className={`fixed inset-0 bg-white z-50 transition-opacity duration-1000 pointer-events-none ${
                    fadeOverlayVisible ? 'opacity-100' : 'opacity-0'
                }`}
            />

            <h1 className="text-4xl mb-8 font-bold z-10">Upgrade Pagina</h1>

            <img
                src={currentButton}
                alt={money >= 14 ? "Upgrade beschikbaar" : "Upgrade niet beschikbaar"}
                className="w-64 h-auto mb-4 z-10"
            />

            <div className="text-lg z-10">
                Huidig geld: <span className="font-bold">{money}</span>
            </div>

            <div className="mt-6 flex gap-4 z-10">
                <button
                    onClick={() => setMoney((prev) => Math.max(0, prev - 5))}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    -5
                </button>
                <button
                    onClick={() => setMoney((prev) => prev + 5)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    +5
                </button>
            </div>
        </div>
    );
};

export default UpgradePage;
