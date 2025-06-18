import React, { useEffect, useRef, useState } from "react";

const genereerSter = () => {
    const size = Math.random() * 2 + 1;
    return {
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        speed: Math.random() * 0.25 + 0.03, // pixels per frame
        opacity: Math.random() * 0.5 + 0.5,
    };
};

const SterrenBG_game = ({ aantalSterren = 100, versnelling = 1 }) => {
    const [sterren, setSterren] = useState([]);
    const sterrenRef = useRef([]);

    useEffect(() => {
        const initSterren = Array.from({ length: aantalSterren }, genereerSter);
        setSterren(initSterren);
        sterrenRef.current = initSterren;
    }, [aantalSterren]);

    useEffect(() => {
        let animId;

        const beweegSterren = () => {
            sterrenRef.current = sterrenRef.current.map((ster) => {
                let nieuweX = ster.x - ster.speed * versnelling;

                if (nieuweX < 0) {
                    nieuweX = 100;
                    return { ...genereerSter(), x: nieuweX };
                }

                return { ...ster, x: nieuweX };
            });

            setSterren([...sterrenRef.current]);
            animId = requestAnimationFrame(beweegSterren);
        };

        animId = requestAnimationFrame(beweegSterren);
        return () => cancelAnimationFrame(animId);
    }, [versnelling]);

    return (
        <div className="absolute inset-0 z-0 bg-background overflow-hidden">
            {sterren.map((ster, index) => (
                <div
                    key={index}
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

export default SterrenBG_game;
