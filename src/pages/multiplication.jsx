import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import SterrenBG_Game from "../component/sterrenBG_game.jsx";

function Multiplication() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isEndPopup, setIsEndPopup] = useState(false);

    const [button1Value, setButton1Value] = useState("0");
    const [button2Value, setButton2Value] = useState("0");
    const [button3Value, setButton3Value] = useState("0");
    const [button4Value, setButton4Value] = useState("0");

    const [number1, setNumber1] = useState(3);
    const [number2, setNumber2] = useState(3);
    const [answer, setAnswer] = useState(number1 * number2);

    const [question, setQuestion] = useState(0);
    const questionCount = 5;
    const [correctAmmount, setCorrectAmmount] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isIncorrect, setIsIncorrect] = useState(false);

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [finalTime, setFinalTime] = useState(0);

    const [x, setX] = useState(150);
    const [y, setY] = useState(visualViewport.height / 2 - 100);
    const [rotate, setRotate] = useState(0);

    const [speedMult, setSpeedMult] = useState(1);

    const [incorrectButtonId, setIncorrectButtonId] = useState(null);
    const [hiddenButtons, setHiddenButtons] = useState([]);

    const [showFadeIn, setShowFadeIn] = useState(true);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const timeout = setTimeout(() => setShowFadeIn(false), 1000); // 1s fade
        return () => clearTimeout(timeout);
    }, []);



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
        const rightAnswerButton = Math.floor(Math.random() * 4);
        setButton1Value(rightAnswerButton === 0 ? answer : Math.floor(Math.random() * 100));
        setButton2Value(rightAnswerButton === 1 ? answer : Math.floor(Math.random() * 100));
        setButton3Value(rightAnswerButton === 2 ? answer : Math.floor(Math.random() * 100));
        setButton4Value(rightAnswerButton === 3 ? answer : Math.floor(Math.random() * 100));
    }, [answer]);

    useEffect(() => {
        let intervalId;
        if (isRunning) {
            intervalId = setInterval(() => setTime(prev => prev + 1), 1000);
        }
        return () => clearInterval(intervalId);
    }, [isRunning]);

    async function newQuestion() {
        const newNumber1 = Math.floor(Math.random() * 10) + 1;
        const newNumber2 = Math.floor(Math.random() * 10) + 1;
        const newAnswer = newNumber1 * newNumber2;
        const rightAnswerButton = Math.floor(Math.random() * 4);

        setHiddenButtons([]); // reset knoppen zichtbaar

        setButton1Value(rightAnswerButton === 0 ? newAnswer : Math.floor(Math.random() * 100));
        setButton2Value(rightAnswerButton === 1 ? newAnswer : Math.floor(Math.random() * 100));
        setButton3Value(rightAnswerButton === 2 ? newAnswer : Math.floor(Math.random() * 100));
        setButton4Value(rightAnswerButton === 3 ? newAnswer : Math.floor(Math.random() * 100));

        setNumber1(newNumber1);
        setNumber2(newNumber2);
        setAnswer(newAnswer);
        setIsRunning(true);
    }

    function findCorrectButtonId() {
        const correctValue = number1 * number2;
        if (parseInt(button1Value) === correctValue) return "1";
        if (parseInt(button2Value) === correctValue) return "2";
        if (parseInt(button3Value) === correctValue) return "3";
        if (parseInt(button4Value) === correctValue) return "4";
        return null;
    }

    function handleAnswerButton(event) {
        event.preventDefault();
        const id = event.currentTarget.getAttribute("id");
        const value = parseInt(event.currentTarget.querySelector("p").textContent);

        if (value === (number1 * number2)) {
            setX(event.currentTarget.offsetLeft - 80);
            setY(event.currentTarget.offsetTop + 100);
            setIsCorrect(true);
            setSpeedMult(8);

            setTimeout(() => {

                setIsCorrect(false);
                handleSpeed();

                setCorrectAmmount(prev => prev + 1);
                setQuestion(prev => prev + 1);
                if (question === questionCount - 1) {
                    endLesson();
                } else {
                    setX(200);
                    setY(visualViewport.height / 2 - 100);
                    newQuestion();
                }
            }, 1500);
        } else {
            setHiddenButtons([...hiddenButtons, id]); // verberg alleen fout aangeklikte knop
            setIsIncorrect(true);
            setIncorrectButtonId(id);
            setRotate(prev => prev - 360);

            setTimeout(() => {
                setIsIncorrect(false);
                setIncorrectButtonId(null);
            }, 1000);
        }
    }

    async function handleSpeed() {
        setSpeedMult(4);
        setTimeout(() => {
            setSpeedMult(1);
        }, 500);
    }

    function handleQuitButton(event) {
        event.preventDefault();
        navigate("/");
    }

    async function endLesson() {
        setIsEndPopup(true);
        setIsRunning(false);
        setFinalTime(time);

        const earnedCoins = correctAmmount;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/api/game/me/coins', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount: earnedCoins })
            });

            if (response.ok) {
                const data = await response.json();
                console.log(`✅ Added ${earnedCoins} coins. Total now: ${data.coins}`);
            } else {
                console.log('❌ Error adding coins');
            }
        } catch (err) {
            console.error('❌ Exception updating coins:', err);
        }
    }

    const getButtonClass = (id) => {
        const base = "w-[23vh] h-[12vh] bg-[url('./images/speedboost.png')] bg-cover bg-center";
        const positionMap = {
            "1": "ml-[70%]",
            "2": "ml-[50%]",
            "3": "ml-[70%]",
            "4": "ml-[50%]",
        };
        const visibility = hiddenButtons.includes(id.toString()) ? "invisible" : "";
        return `${positionMap[id.toString()]} ${base} ${visibility}`;
    };
    if (loading) return null
    return (
        <main className="bg-background">
            <SterrenBG_Game versnelling={speedMult} />

            <motion.div
                animate={{ x, y, rotate }}
                transition={{ ease: "easeOut", duration: 1 }}
                className="absolute flex flex-col justify-center z-40 w-80 h-40"
            >
                <div className="relative w-full h-full">
                    <img
                        src="/testRaketRotated.png"
                        className="w-full h-full relative z-10"
                        alt="Rocket"
                    />
                    <img
                        src="/flame.gif"
                        alt="Flame"
                        className="w-14 absolute left-1/2 -translate-x-40 top-full -mt-32 -rotate-90 z-0"
                    />
                </div>
            </motion.div>

            <section className="fixed bottom-10 flex justify-center w-full">
                <div className="w-[70%] pt-10">
                    <progress
                        className="-skew-x-12 bg-offwhite rounded-xl h-10 w-full"
                        value={1 - ((questionCount - question) / questionCount)}
                        max="1"
                        style={{ WebkitAppearance: "none", appearance: "none" }}
                    />
                    <style>
                        {`
                        progress::-webkit-progress-bar {
                            background-color: #E6E6E6;
                            border-radius: 10px;
                            box-shadow: 0px 10px #C2C2C2;
                        }
                        progress::-webkit-progress-value {
                            background-color: #00FF62;
                            border-radius: 10px;
                            box-shadow: 0px 10px #00FFD4;
                        }
                        `}
                    </style>
                </div>
                <div className="flex justify-center p-10">
                    <p className="text-5xl">{question}/{questionCount}</p>
                </div>
            </section>

            <section className="fixed top-32 w-full">
                <form className="relative flex flex-col pt-10">
                    {[1, 2, 3, 4].map((id) => (
                        <motion.button
                            key={id}
                            id={id.toString()}
                            onClick={handleAnswerButton}
                            whileTap={{ scale: 0.9 }}
                            className={getButtonClass(id)}
                        >
                            <p className="text-7xl drop-shadow-[0px_0px_4px_rgba(0,0,0,1)]">
                                {eval(`button${id}Value`)}
                            </p>
                        </motion.button>
                    ))}
                </form>
            </section>

            <section className="fixed top-5 left-1/2 transform -translate-x-1/2 pt-10 text-center">
                <h2 className={`text-8xl drop-shadow-[0px_0px_4px_rgba(0,0,0,1)] ${
                    isCorrect ? 'text-green-500' : isIncorrect ? 'text-red-500' : 'text-text'
                }`}>
                    {number1} x {number2}
                </h2>
            </section>

            {isEndPopup && (
                <section className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="text-center flex flex-col gap-6 text-2xl pl-40 pr-40 pt-12 pb-12 rounded-3xl -skew-x-12 shadow-lg bg-cyan-950 bg-opacity-70">
                        <h1 className="text-yellow-200 text-6xl">Level gehaald!</h1>
                        <div className="flex gap-20">
                            <div className="text-left flex flex-col gap-2">
                                <h2>Les voltooid!</h2>
                                <h2>Vragen goed: {correctAmmount}</h2>
                                <h2>Tijd gespeeld: {finalTime}s</h2>
                            </div>
                            <div className="text-right flex flex-col gap-2">
                                <h2>5 muntjes</h2>
                                <h2>{correctAmmount} muntjes</h2>
                                <h2>3 muntjes</h2>
                            </div>
                        </div>
                        <button onClick={handleQuitButton}
                                className="mt-4 bg-RaketGreenBtn rounded-lg pb-4 pt-4 text-background shadow-custom-blue">
                            <p>Terug naar raket</p>
                        </button>
                    </div>
                </section>
            )}

            {showFadeIn && (
                <motion.div
                    className="fixed inset-0 bg-background z-50"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 2 }}
                />
            )}

        </main>
    );
}

export default Multiplication;
