import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SterrenBG from "../component/sterrenBG.jsx";
import alienImg from "../img/alien.png";
import raketImg from "../img/rocket.png";
import halverraL from "../img/halverraL.png";
import halverraR from "../img/halverraR.png";
import halverraa from "../img/halverraa.png";
import minariaL from "../img/minariaL.png";
import minariaR from "../img/minariaR.png";
import minariaa from "../img/minariaa.png";
import plusopiaL from "../img/plusopiaL.png";
import plusopiaR from "../img/plusopiaR.png";
import plusopiaa from "../img/plusopiaa.png";
import xtropilosL from "../img/xtropilosL.png";
import xtropilosR from "../img/xtropilosR.png";
import xtropiloss from "../img/xtropiloss.png";

const levels = [
    {
        name: "Plusopia",
        color: "#d95b19",
        planets: ["#ea4cc4", "#3fdc87", "#78c6f0"],
        flag: "➕",
        leftArrow: plusopiaL,
        rightArrow: plusopiaR,
        planetImg: plusopiaa,
        path: "/multiplication"  // Only Plusopia has special path
    },
    {
        name: "Minaria",
        color: "#4094d6",
        planets: ["#f18a21", "#ea4cc4", "#3fdc87"],
        flag: "➖",
        leftArrow: minariaL,
        rightArrow: minariaR,
        planetImg: minariaa,
        path: "/"  // Others go to home
    },
    {
        name: "X-tropilos",
        color: "#6abd45",
        planets: ["#78c6f0", "#f18a21", "#ea4cc4"],
        flag: "🗙",
        leftArrow: xtropilosL,
        rightArrow: xtropilosR,
        planetImg: xtropiloss,
        path: "/"  // Others go to home
    },
    {
        name: "Halverra",
        color: "#ea4cc4",
        planets: ["#6abd45", "#78c6f0", "#f18a21"],
        flag: ":",
        leftArrow: halverraL,
        rightArrow: halverraR,
        planetImg: halverraa,
        path: "/"  // Others go to home
    },
];

const generateStars = (num) => {
    return Array.from({ length: num }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 2,
        duration: Math.random() * 4 + 2,
    }));
};

const LevelSelector = () => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [stars, setStars] = useState(generateStars(150));
    const [showShootingStar, setShowShootingStar] = useState(false);
    const [showAlien, setShowAlien] = useState(false);
    const initialLoad = useRef(true);

    const navigate = useNavigate();

    const next = () => {
        setDirection(1);
        setIndex((prevIndex) => (prevIndex + 1) % levels.length);
    };

    const prev = () => {
        setDirection(-1);
        setIndex((prevIndex) => (prevIndex - 1 + levels.length) % levels.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setShowShootingStar(true);
            setTimeout(() => setShowShootingStar(false), 1000);
        }, 8000);

        const alienInterval = setInterval(() => {
            setShowAlien(Math.random() > 0.7);
            setTimeout(() => setShowAlien(false), 3000);
        }, 12000);

        return () => {
            clearInterval(interval);
            clearInterval(alienInterval);
        };
    }, []);

    const handlePlanetClick = () => {
        navigate(levels[index].path);
    };

    return (
        <div className="relative h-screen bg-black text-white overflow-hidden">
            <SterrenBG />
            <div className="absolute top-4 left-4 z-30">
                <button
                    onClick={() => navigate("/")}
                    className="text-white text-2xl hover:scale-110 transition-transform"
                    title="Ga naar home"
                >
                    🏠
                </button>
            </div>

            {showShootingStar && (
                <motion.div
                    className="absolute w-1 h-1 bg-white rounded-full"
                    initial={{ top: "10%", left: "90%", opacity: 1 }}
                    animate={{ top: "80%", left: "10%", opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ boxShadow: "0 0 12px white" }}
                />
            )}

            <h1 className="absolute top-8 left-0 right-0 text-center text-4xl font-bold z-10">Kies een planeet</h1>

            <div className="h-full flex flex-col items-center justify-center">
                <div className="flex items-center justify-center z-10 w-full px-8">
                    <motion.button
                        onClick={prev}
                        className="w-1/6 text-left flex justify-start pl-10"
                        whileHover={{
                            scale: 1.2,
                            filter: `drop-shadow(0 0 20px ${levels[index].color})`
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                            duration: 0.3
                        }}
                        style={{
                            filter: `drop-shadow(0 0 15px ${levels[index].color})`,
                        }}
                    >
                        <img
                            src={levels[index].leftArrow}
                            alt="Vorige"
                            className="w-60 h-60 object-contain"
                            style={{
                                filter: `drop-shadow(0 0 15px ${levels[index].color})`,
                                transition: "transform 0.3s ease, filter 0.3s ease"
                            }}
                        />
                    </motion.button>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={levels[index].name}
                            initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center w-4/6 cursor-pointer select-none"
                            onClick={handlePlanetClick}
                            title={`Ga naar ${levels[index].name}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg width="220" height="60" viewBox="0 0 220 60" className="mb-2">
                                <path id="curve" d="M10,50 Q110,0 210,50" fill="transparent" />
                                <text fill="white" fontSize="30" fontWeight="bold">
                                    <textPath xlinkHref="#curve" startOffset="50%" textAnchor="middle">
                                        {levels[index].name}
                                    </textPath>
                                </text>
                            </svg>

                            <motion.img
                                src={levels[index].planetImg}
                                alt={`${levels[index].name} planeet`}
                                className={`object-contain ${
                                    levels[index].name === 'Plusopia'
                                        ? 'w-[22rem] h-[22rem] -mt-6'
                                        : 'w-[18rem] h-[18rem]'
                                }`}
                            />

                            <div className="mt-4 text-xl">
                                <span className="mr-2">{levels[index].flag}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <motion.button
                        onClick={next}
                        className="w-1/6 text-right flex justify-end pr-10"
                        whileHover={{
                            scale: 1.2,
                            filter: `drop-shadow(0 0 20px ${levels[index].color})`
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                            duration: 0.3
                        }}
                        style={{
                            filter: `drop-shadow(0 0 15px ${levels[index].color})`,
                        }}
                    >
                        <img
                            src={levels[index].rightArrow}
                            alt="Volgende"
                            className="w-60 h-60 object-contain"
                            style={{
                                filter: `drop-shadow(0 0 15px ${levels[index].color})`,
                                transition: "transform 0.3s ease, filter 0.3s ease"
                            }}
                        />
                    </motion.button>
                </div>

                <div className="absolute bottom-[-50px] z-10 overflow-hidden h-40 w-40">
                    <motion.img
                        src={raketImg}
                        alt="raket"
                        className="w-full h-auto object-contain"
                        animate={{
                            y: [0, -5, 0, 5, 0],
                            rotate: [0, 1, 0, -1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>
            </div>

            {showAlien && (
                <motion.img
                    src={alienImg}
                    alt="alien"
                    className="absolute bottom-12 right-12 w-12 z-20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.5 }}
                />
            )}
        </div>
    );
};

export default LevelSelector;