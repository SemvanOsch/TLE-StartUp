import React, { useEffect, useRef, useState } from "react";

const genereerSter = () => {
    const size = Math.random() * 2 + 1;
    return {
        id: crypto.randomUUID(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        speed: Math.random() * 0.25 + 0.03, // pixels per frame
        opacity: Math.random() * 0.5 + 0.5,
    };
};

const SterrenBG = ({ aantalSterren = 750 }) => {
    const [sterren, setSterren] = useState([]);
    const sterrenRef = useRef([]);

    // Initieel vullen
    useEffect(() => {
        const initSterren = Array.from({ length: aantalSterren }, genereerSter);
        setSterren(initSterren);
        sterrenRef.current = initSterren;
    }, [aantalSterren]);

    // Animatie loop
    useEffect(() => {
        let animId;

        const beweegSterren = () => {
            sterrenRef.current = sterrenRef.current.map((ster) => {
                let nieuweY = ster.y + ster.speed;
                if (nieuweY > 100) {
                    // Ster opnieuw bovenaan spawnen
                    nieuweY = 0;
                    return { ...genereerSter(), y: nieuweY };
                }
                return { ...ster, y: nieuweY };
            });

            setSterren([...sterrenRef.current]);
            animId = requestAnimationFrame(beweegSterren);
        };

        animId = requestAnimationFrame(beweegSterren);
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <div className="absolute inset-0 z-0 bg-background overflow-hidden">
            {sterren.map((ster) => (
                <div
                    key={ster.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        width: `${ster.size}px`,
                        height: `${ster.size}px`,
                        left: `${ster.x}%`,
                        top: `${ster.y}%`,
                        opacity: ster.opacity,
                        boxShadow: `0 0 ${ster.size * 2}px white`,
                    }}
                />
            ))}
        </div>
    );
};

export default SterrenBG;
