import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router";
import { motion } from "motion/react"
import SterrenBG_Game from "../component/sterrenBG_game.jsx";

function Multiplication() {
    const navigate = useNavigate();

    const [isEndPopup, setIsEndPopup] = useState(false);

    const [button1Value, setButton1Value] = useState("0");
    const [button2Value, setButton2Value] = useState("0");
    const [button3Value, setButton3Value] = useState("0");
    const [button4Value, setButton4Value] = useState("0");

    const [number1, setNumber1] = useState(3);
    const [number2, setNumber2] = useState(3);
    const [answer,setAnswer] = useState(number1 * number2);

    const [question, setQuestion] = useState(0);
    const questionCount = 10;
    const [correctAmmount, setCorrectAmmount] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isIncorrect, setIsIncorrect] = useState(false);

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [finalTime, setFinalTime] = useState(0);


    const [x, setX] = useState(150)
    const [y, setY] = useState(visualViewport.height/2-100)
    const [rotate, setRotate] = useState(0)

    const [speedMult, setSpeedMult] = useState(1);
    useEffect(() => {
        const rightAnswerButton = Math.floor(Math.random() * 4);

        setButton1Value(rightAnswerButton === 0 ? (answer) : Math.floor(Math.random() * 100));
        setButton2Value(rightAnswerButton === 1 ? (answer) : Math.floor(Math.random() * 100));
        setButton3Value(rightAnswerButton === 2 ? (answer) : Math.floor(Math.random() * 100));
        setButton4Value(rightAnswerButton === 3 ? (answer) : Math.floor(Math.random() * 100));
    }, [answer]);


    useEffect(() => {
        let intervalId;
        if (isRunning) {
            intervalId = setInterval(() => setTime(time + 1), 1000);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time]);

    async function newQuestion() {
        const newNumber1 = Math.floor(Math.random() * 10) + 1;
        const newNumber2 = Math.floor(Math.random() * 10) + 1;
        const newAnswer = newNumber1 * newNumber2;
        const rightAnswerButton = Math.floor(Math.random() * 4);

        await setButton1Value(rightAnswerButton === 0 ? newAnswer : Math.floor(Math.random() * 100));
        await setButton2Value(rightAnswerButton === 1 ? newAnswer : Math.floor(Math.random() * 100));
        await setButton3Value(rightAnswerButton === 2 ? newAnswer : Math.floor(Math.random() * 100));
        await setButton4Value(rightAnswerButton === 3 ? newAnswer : Math.floor(Math.random() * 100));

        await setNumber1(newNumber1);
        await setNumber2(newNumber2);
        await setAnswer(newAnswer);

        setIsRunning(true);
        console.log(time)
    }

    function handleAnswerButton(event){
        event.preventDefault();

        const id = event.currentTarget.getAttribute("id");
        const value = parseInt(event.currentTarget.querySelector("p").textContent); // convert to number

        if (question === questionCount - 1){
            console.log("The lesson has ended, returning home!")
            endLesson()
        }
        if (value === (number1 * number2)) {
            setX(event.currentTarget.offsetLeft);
            setY(event.currentTarget.offsetTop + 100);
            setIsCorrect(true);
            setSpeedMult(8)
            setTimeout(() => {
                setX(200);
                setY(visualViewport.height/2-100)
                setIsCorrect(false);
                handleSpeed()
                setCorrectAmmount(correctAmmount + 1);
                setQuestion(question + 1);
                newQuestion();
            }, 1500);
        } else {
            console.log(`Pressed button ${id}`);

            setIsIncorrect(true);
            setRotate(rotate-360)
            setTimeout(() => {
                setIsIncorrect(false);
            }, 1000);
        }
    }

    async function handleSpeed(){
        setSpeedMult(4)
        setTimeout(() => {
            setSpeedMult(1)
        }, 500)
    }

    function handleQuitButton(event) {
        event.preventDefault();
        navigate("/");
    }

    async function endLesson(){
        await setIsEndPopup(true);
        await setIsRunning(false);
        await setFinalTime(time)
    }

    return(
        <main className="bg-background">
            <SterrenBG_Game versnelling={speedMult}/>
            <motion.div
                animate={{ x, y, rotate}}
                transition={{ ease: "easeOut", duration: 1 }}
                className="absolute flex flex-col justify-center z-50">
                <img src="/images/rocket.png" className="w-80 h-40" alt="Rocket"></img>
            </motion.div>
            <section className="fixed bottom-10 flex justify-center w-full">
                <div className="w-[70%] pt-10">
                    <progress
                        className="-skew-x-12 bg-offwhite rounded-xl h-10 w-full"
                        value={1 - ((questionCount - question) / questionCount)}
                        max="1"
                        style={{
                            WebkitAppearance: "none",
                            appearance: "none",
                        }}
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
            <section className="fixed top-40 w-full">
                <div>
                    <form className="relative flex flex-col pt-10">
                        <motion.button
                            id="1"
                            onClick={handleAnswerButton}
                            whileTap={{scale: 0.9}}
                            className="ml-[70%] w-72 h-32 bg-[url('./images/speedboost.png')] bg-cover bg-center">
                            <p className="text-8xl drop-shadow-[0px_0px_4px_rgba(0,0,0,1)]">{button1Value}</p>
                        </motion.button>
                        <motion.button
                            id="2"
                            onClick={handleAnswerButton}
                            whileTap={{scale: 0.9}}
                            className="ml-[50%] w-72 h-32 bg-[url('./images/speedboost.png')] bg-cover bg-center">
                            <p className="text-8xl drop-shadow-[0px_0px_4px_rgba(0,0,0,1)]">{button2Value}</p>
                        </motion.button>
                        <motion.button
                            id="3"
                            onClick={handleAnswerButton}
                            whileTap={{scale: 0.9}}
                            className="ml-[70%] w-72 h-32 bg-[url('./images/speedboost.png')] bg-cover bg-center">
                            <p className="text-8xl drop-shadow-[0px_0px_4px_rgba(0,0,0,1)]">{button3Value}</p>
                        </motion.button>
                        <motion.button
                            id="4"
                            onClick={handleAnswerButton}
                            whileTap={{scale: 0.9}}
                            className="ml-[50%] w-72 h-32 bg-[url('./images/speedboost.png')] bg-cover bg-center">
                            <p className="text-8xl drop-shadow-[0px_0px_4px_rgba(0,0,0,1)]">{button4Value}</p>
                        </motion.button>
                        )
                    </form>
                </div>
            </section>
            <section className="fixed top-5 left-1/2 transform -translate-x-1/2 pt-10 text-center">
                <h2
                    className={`text-8xl drop-shadow-[0px_0px_4px_rgba(0,0,0,1)] ${
                        isCorrect ? 'text-green-500' : isIncorrect ? 'text-red-500' : 'text-text'}`}>
                    {number1} * {number2}
                </h2>
            </section>
            {isEndPopup && (
                <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div
                        className="text-center flex flex-col gap-6 text-2xl pl-40 pr-40 pt-12 pb-12 rounded-3xl -skew-x-12 shadow-lg bg-cyan-950 bg-opacity-70">
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
        </main>
    )
}

export default Multiplication;