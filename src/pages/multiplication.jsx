import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from "react-router";

function Multiplication() {
    const [button1Value, setButton1Value] = useState("10");
    const [button2Value, setButton2Value] = useState("20");
    const [button3Value, setButton3Value] = useState("30");
    const [button4Value, setButton4Value] = useState("40");

    const [rightButton, setRightButton] = useState("1");

    useEffect(() => {
        const rightAnswerButton = Math.floor(Math.random() * 4);
        setRightButton(rightAnswerButton);
        console.log("Right answer button:", rightAnswerButton);

        setButton1Value(rightAnswerButton === 0 ? 20 : Math.floor(Math.random() * 100));
        setButton2Value(rightAnswerButton === 1 ? 20 : Math.floor(Math.random() * 100));
        setButton3Value(rightAnswerButton === 2 ? 20 : Math.floor(Math.random() * 100));
        setButton4Value(rightAnswerButton === 3 ? 20 : Math.floor(Math.random() * 100));
    }, []);


    function handleButton(event){
        event.preventDefault()
        const id = event.currentTarget.getAttribute("id");
        console.log(`Pressed button ${id}`);
    }

    return(
        <main className="bg-background">
            <section className="flex justify-center">
                <div className="w-[70%] pt-10">
                    <progress
                        className="-skew-x-12 bg-offwhite rounded-xl h-10 w-full"
                        value="0.4"
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
            </section>
            <section>
                <form className="flex flex-col pt-10">
                    <button id="1" onClick={handleButton}
                            className="ml-[70%] w-80 h-40 bg-[url('./images/speedboost.png')] bg-cover bg-center">
                        <p className="text-8xl drop-shadow-[0px_0px_4px_rgba(0,0,0,1)]">{button1Value}</p>
                    </button>
                    <button id="2" onClick={handleButton}
                            className="ml-[50%] w-80 h-40 bg-[url('./images/speedboost.png')] bg-cover bg-center">
                        <p className="text-8xl drop-shadow-[0px_0px_4px_rgba(0,0,0,1)]">{button2Value}</p>
                    </button>
                    <button id="3" onClick={handleButton}
                            className="ml-[70%] w-80 h-40 bg-[url('./images/speedboost.png')] bg-cover bg-center">
                        <p className="text-8xl drop-shadow-[0px_0px_4px_rgba(0,0,0,1)]">{button3Value}</p>
                    </button>
                    <button id="4" onClick={handleButton}
                            className="ml-[50%] w-80 h-40 bg-[url('./images/speedboost.png')] bg-cover bg-center">
                        <p className="text-8xl drop-shadow-[0px_0px_4px_rgba(0,0,0,1)]">{button4Value}</p>
                    </button>
                </form>
            </section>
            <section className="flex justify-center pt-10">
                <h2 className="text-9xl drop-shadow-[0px_0px_4px_rgba(0,0,0,1)]">4*5</h2>
            </section>
        </main>
    )
}

export default Multiplication;