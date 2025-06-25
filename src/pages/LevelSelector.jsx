import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SterrenBG from "../component/SterrenBG.jsx";
import alienImg from "../img/alien.png";
import raketImg from "/testRaket.png";
import halverraL from "../img/halverraL.png";
import halverraR from "../img/halverraR.png"
import halverraa from "/planeten/Halverraa.png";
import minariaL from "../img/minariaL.png";
import minariaR from "../img/minariaR.png";
import minariaa from "/planeten/Minariaa.png";
import plusopiaL from "../img/plusopiaL.png";
import plusopiaR from "../img/plusopiaR.png";
import plusopiaa from "/planeten/Plusopiaa.png";
import xtropilosL from "../img/xtropilosL.png";
import xtropilosR from "../img/xtropilosR.png";
import {getUserCoins} from "../api.js";
import xtropiloss from "/planeten/Xtropoliss.png";

const levels = [
    {
        name: "Plusopia",
        color: "#d95b19",
        leftArrow: plusopiaL,
        rightArrow: plusopiaR,
        planetImg: plusopiaa,
        path: "/plusSums"
    },
    {
        name: "Minaria",
        color: "#4094d6",
        leftArrow: minariaL,
        rightArrow: minariaR,
        planetImg: minariaa,
        path: "/subtraction"
    },
    {
        name: "X-tropilos",
        color: "#6abd45",
        leftArrow: xtropilosL,
        rightArrow: xtropilosR,
        planetImg: xtropiloss,
        path: "/multiplication"
    },
    {
        name: "Halverra",
        color: "#ea4cc4",
        leftArrow: halverraL,
        rightArrow: halverraR,
        planetImg: halverraa,
        path: "/division"
    },
];

const LevelSelector = () => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [showShootingStar, setShowShootingStar] = useState(false);
    const [showAlien, setShowAlien] = useState(false);
    const [launching, setLaunching] = useState(false);
    const [zoomTarget, setZoomTarget] = useState({ x: 0.5, y: 0.5 });
    const [showFade, setShowFade] = useState(false);
    const [initialZoomOut, setInitialZoomOut] = useState(false);
    const planetRef = useRef(null);
    const navigate = useNavigate();
    const [coins, setCoins] = useState(0);

    useEffect(() => {
        const fetchCoins = async () => {
            const userId = localStorage.getItem("userId");
            if (userId) {
                const result = await getUserCoins(userId);
                console.log('Coin response:', result);

                // Adjust this line based on your API response
                const actualCoins = result.coins ?? result.user?.coins;

                if (actualCoins !== undefined) {
                    setCoins(actualCoins);
                }
            }
        };
        fetchCoins();
    }, []);
    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem("token");
            const response = await fetch("https://planeetwiskunde-backend.onrender.com/api/game/me", {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok)  setLoading(false);
            if (!response.ok) window.location.href = "/login";
        }

        fetchUser();
    }, []);

    useEffect(() => {
        const starInterval = setInterval(() => {
            setShowShootingStar(true);
            setTimeout(() => setShowShootingStar(false), 1000);
        }, 8000);

        const alienInterval = setInterval(() => {
            setShowAlien(Math.random() > 0.7);
            setTimeout(() => setShowAlien(false), 3000);
        }, 12000);

        return () => {
            clearInterval(starInterval);
            clearInterval(alienInterval);
        };
    }, []);

    const next = () => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % levels.length);
    };

    const prev = () => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + levels.length) % levels.length);
    };

    const handlePlanetClick = () => {
        if (planetRef.current) {
            const rect = planetRef.current.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;
            setZoomTarget({ x, y });
            setLaunching(true);

            // Start fade-out after zoom delay
            setTimeout(() => setShowFade(true), 1200);

            // Navigate after fade is visible
            setTimeout(() => navigate(levels[index].path), 2000);
        }
    };
    const [loading, setLoading] = useState(true);
    if (loading) return null
    return (
        <motion.div
            className="relative h-screen bg-black text-white overflow-hidden"
            initial={{ scale: 2, originX: 0.5, originY: 0.5 }}
            animate={{
                scale: launching ? 2 : (initialZoomOut ? 2 : 1),
                originX: zoomTarget.x,
                originY: zoomTarget.y,
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
        >
            <SterrenBG />
            <div className="absolute top-4 left-4 z-30">
                <button
                    onClick={() => navigate("/")}
                    className="hover:scale-110 transition-transform"
                    title="Ga naar home"
                >
                    <img
                        src="/Home.png"
                        alt="Home"
                        className="w-8 h-8" // Pas deze waarden aan indien nodig
                    />
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
            <div
                className="absolute top-4 right-28 bg-yellow-300 text-black font-bold py-2 px-4 rounded-full shadow-lg text-lg z-20">
                🪙 {coins}
            </div>
            <h1 className="absolute top-8 left-0 right-0 text-center text-4xl font-bold z-10">
                Kies een planeet
            </h1>

            <div className="h-full flex flex-col items-center justify-center">
                <div className="flex items-center justify-center z-10 w-full px-8">
                    <motion.button
                        onClick={prev}
                        className="w-1/6 text-left flex justify-start pl-10"
                        whileHover={{
                            scale: 1.2,
                            filter: `drop-shadow(0 0 20px ${levels[index].color})`,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                            duration: 0.3,
                        }}
                    >
                        <img
                            src={levels[index].leftArrow}
                            alt="Vorige"
                            className="w-60 h-60 object-contain"
                        />
                    </motion.button>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={levels[index].name}
                            ref={planetRef}
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
                                    levels[index].name === "Plusopia"
                                        ? "w-[28rem] h-[28rem] -mt-6"
                                        : "w-[22rem] h-[22rem]"
                                }`}
                            />
                        </motion.div>
                    </AnimatePresence>

                    <motion.button
                        onClick={next}
                        className="w-1/6 text-right flex justify-end pr-10"
                        whileHover={{
                            scale: 1.2,
                            filter: `drop-shadow(0 0 20px ${levels[index].color})`,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                            duration: 0.3,
                        }}
                    >
                        <img
                            src={levels[index].rightArrow}
                            alt="Volgende"
                            className="w-60 h-60 object-contain"
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

            {/* Fade-out overlay */}
            {showFade && (
                <motion.div
                    className="absolute top-0 left-0 w-full h-full bg-background z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                />
            )}
        </motion.div>
    );
};

export default LevelSelector;
