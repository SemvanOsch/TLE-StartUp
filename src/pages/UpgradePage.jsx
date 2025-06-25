import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import upgradeButton20 from '/src/images/upgrade20.png'
import upgradeButton20disabled from '/src/images/upgrade20disabled.png'
import upgradeButton50 from '/src/images/upgrade50.png'
import upgradeButton50disabled from '/src/images/upgrade50disabled.png'
import upgradeButton150 from '/src/images/upgrade150.png'
import upgradeButton150disabled from '/src/images/upgrade150disabled.png'
import upgradeButton250 from '/src/images/upgrade250.png'
import upgradeButton250disabled from '/src/images/upgrade250disabled.png'
import upgradeButton300 from '/src/images/upgrade300.png'
import upgradeButton300disabled from '/src/images/upgrade300disabled.png'
import upgradeButton350 from '/src/images/upgrade350.png'
import upgradeButton350disabled from '/src/images/upgrade350disabled.png'
import upgradeButton400 from '/src/images/upgrade400.png'
import upgradeButton400disabled from '/src/images/upgrade400disabled.png'
import upgradeButton500 from '/src/images/upgrade500.png'
import upgradeButton500disabled from '/src/images/upgrade500disabled.png'
import upgradeButton1000 from '/src/images/upgrade1000.png'
import upgradeButton1000disabled from '/src/images/upgrade1000disabled.png'
import upgradeButton0 from '/src/images/upgrade0.png'
import background1 from '/src/images/background1.png'
import background2 from '/src/images/background2.png'
import background3 from '/src/images/background3.png'
import background4 from '/src/images/background4.png'
import background5 from '/src/images/background5.png'
import background6 from '/src/images/background6.png'
import background7 from '/src/images/background7.png'
import background8 from '/src/images/background8.png'
import background9 from '/src/images/background9.png'
import background10 from '/src/images/background10.png'
import '/src/index.css'
import SterrenBG from "../component/sterrenBG.jsx";




const UpgradePage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchUser(){
            const token = localStorage.getItem('token')
            const response = await fetch('https://planeetwiskunde-backend.onrender.com/api/game/me',{
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            if(response.ok){
                const user = await response.json()
                setMoney(user.coins)
                setUpgradedStage(user.upgradeStage)
                setLoading(false);
                console.log('ingelogd', user)
            }else{
                window.location.href = '/login'
            }
        }

        fetchUser()
    }, []);

    async function addMoney(){
        const token = localStorage.getItem('token')
        const response = await fetch('https://planeetwiskunde-backend.onrender.com/api/game/me/coins',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ amount: 100 })
        })

        if(response.ok){
            const data = await response.json()
            setMoney(data.coins)
        }else{
            console.log('error adding coins')
        }
    }
    async function removeMoney(amount){
        const token = localStorage.getItem('token')
        const response = await fetch('https://planeetwiskunde-backend.onrender.com/api/game/me/coins',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ amount })
        })

        if(response.ok){
            const data = await response.json()
            setMoney(data.coins)
        }else{
            console.log('error removing coins')
        }
    }
    async function handleLoguout(){
        try {
            await fetch("https://planeetwiskunde-backend.onrender.com/api/game/logout", { method: "POST" });

            localStorage.removeItem("token");

            window.location.href = "/login";
        } catch (error) {
            console.error(error);
        }
    }

    async function changeStage(stage){
        const token = localStorage.getItem('token');
        const response = await fetch(`https://planeetwiskunde-backend.onrender.com/api/game/upgrade`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({stage})
        });
    }



    const [money, setMoney] = useState()
    const [currentButton, setCurrentButton] = useState()
    const [upgradedStage, setUpgradedStage] = useState(1)
    const [background, setBackground] = useState(background1)
    const [fadeOverlayVisible, setFadeOverlayVisible] = useState(true);
    const [loading, setLoading] = useState(true);


    let blackCatImage = document.getElementById('blackCat')
    let spaceshipWindowImage = document.getElementById('spaceshipWindow')

    function changeButton(){
        if(upgradedStage == 1) {
            if (money >= 20) {
                setCurrentButton(upgradeButton20)
            } else {
                setCurrentButton(upgradeButton20disabled)
            }
        }
        if(upgradedStage == 2){
            setBackground(background2)
            if (money >= 50) {
                setCurrentButton(upgradeButton50)
            } else {
                setCurrentButton(upgradeButton50disabled)
            }
        }
        if(upgradedStage == 3){
            setBackground(background3)
            if (money >= 150) {
                setCurrentButton(upgradeButton150)
            } else {
                setCurrentButton(upgradeButton150disabled)
            }
        }
        if(upgradedStage == 4){
            setBackground(background4)
            if (money >= 250) {
                setCurrentButton(upgradeButton250)
            } else {
                setCurrentButton(upgradeButton250disabled)
            }
        }
        if(upgradedStage == 5){
            setBackground(background5)
            if (money >= 300) {
                setCurrentButton(upgradeButton300)
            } else {
                setCurrentButton(upgradeButton300disabled)
            }
        }
        if(upgradedStage == 6){
            setBackground(background6)
            if (money >= 350) {
                setCurrentButton(upgradeButton350)
            } else {
                setCurrentButton(upgradeButton350disabled)
            }
        }
        if(upgradedStage == 7){
            setBackground(background7)
            if (money >= 400) {
                setCurrentButton(upgradeButton400)
            } else {
                setCurrentButton(upgradeButton400disabled)
            }
        }
        if(upgradedStage == 8){
            setBackground(background8)
            if (money >= 500) {
                setCurrentButton(upgradeButton500)
            } else {
                setCurrentButton(upgradeButton500disabled)
            }
        }
        if(upgradedStage == 9){
            setBackground(background9)
            if (money >= 1000) {
                setCurrentButton(upgradeButton1000)
            } else {
                setCurrentButton(upgradeButton1000disabled)
            }
        }
        if(upgradedStage == 10){
            setCurrentButton(upgradeButton0)
            setBackground(background10)
        }
    }

    function useMoney(){
        if(upgradedStage == 1 && money >= 20) {
            setMoney(money - 20)
            setUpgradedStage(2)
            changeStage(2)
            setBackground(background2)
            removeMoney(-20)
        }
        if(upgradedStage == 2 && money >= 50) {
            setMoney(money - 50)
            setUpgradedStage(3)
            changeStage(3)
            setBackground(background3)
            removeMoney(-50)
        }
        if(upgradedStage == 3 && money >= 150) {
            setMoney(money - 150)
            setUpgradedStage(4)
            changeStage(4)
            setBackground(background4)
            removeMoney(-150)
        }
        if(upgradedStage == 4 && money >= 250) {
            setMoney(money - 250)
            setUpgradedStage(5)
            changeStage(5)
            setBackground(background5)
            removeMoney(-250)
        }
        if(upgradedStage == 5 && money >= 300) {
            setMoney(money - 300)
            setUpgradedStage(6)
            changeStage(6)
            setBackground(background6)
            removeMoney(-300)
        }
        if(upgradedStage == 6 && money >= 350) {
            setMoney(money - 350)
            setUpgradedStage(7)
            changeStage(7)
            setBackground(background7)
            removeMoney(-350)
        }
        if(upgradedStage == 7 && money >= 400) {
            setMoney(money - 400)
            setUpgradedStage(8)
            changeStage(8)
            setBackground(background8)
            removeMoney(-400)
        }
        if(upgradedStage == 8 && money >= 500) {
            setMoney(money - 500)
            setUpgradedStage(9)
            changeStage(9)
            setBackground(background9)
            removeMoney(-500)
        }
        if(upgradedStage == 9 && money >= 1000) {
            setMoney(money - 1000)
            setUpgradedStage(10)
            changeStage(10)
            setBackground(background10)
            removeMoney(-1000)
        }
    }

    useEffect(changeButton, [money, upgradedStage])
    useEffect(() => {
        // Fade away the white overlay shortly after mount
        const timeout = setTimeout(() => {
            setFadeOverlayVisible(false);
        }, 100); // Slight delay for smoother feel

        return () => clearTimeout(timeout);
    }, []);


    if (loading) return null
    return(
        <div
            className=" relative min-h-screen bg-background text-text flex flex-col items-center justify-center overflow-hidden">


            {/* Fade-in white overlay */}
            <div
                className={`fixed inset-0 bg-white z-50 transition-opacity duration-1000 pointer-events-none ${
                    fadeOverlayVisible ? 'opacity-100' : 'opacity-0'
                }`}
            />
            <div className="bg-cover bg-center min-h-screen min-w-full z-40" style={{backgroundImage: `url(${background})`}}>
                <h1 className={'money'}>${money}</h1>
                <img id={'upgradeButton'} src={currentButton} onClick={useMoney}/>
                <button onClick={addMoney}>+money</button>
                <button onClick={handleLoguout}>logout</button>
                <div className="absolute top-4 left-4 z-30">
                    <button
                        onClick={() => navigate("/")}
                        className="text-white text-2xl hover:scale-110 transition-transform"
                        title="Ga naar home"
                    >
                        🏠
                    </button>
                </div>
            </div>
            <SterrenBG/>
        </div>


    );
}

export default UpgradePage;