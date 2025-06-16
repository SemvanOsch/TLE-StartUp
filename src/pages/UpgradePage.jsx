import { useState, useEffect } from 'react';
import upgradeButton20 from '/src/images/upgrade20.png'
import upgradeButton20disabled from '/src/images/upgrade20disabled.png'
import upgradeButton50 from '/src/images/upgrade50.png'
import upgradeButton50disabled from '/src/images/upgrade50disabled.png'
import upgradeButton0 from '/src/images/upgrade0.png'
import background1 from '/src/images/placeholderBackgroundImage1.png'
import background2 from '/src/images/placeholderBackgroundImage2.png'
import blackcat from '/src/images/blackcat.png'
import spaceshipWindow from '/src/images/spaceshipWindow.png'
import '/src/index.css'


const UpgradePage = () => {
    useEffect(() => {
        async function fetchUser(){
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:3001/api/game/me',{
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            if(response.ok){
                const user = await response.json()
                setMoney(user.coins)
                setUpgradedStage(user.upgradeStage)
                console.log('ingelogd', user)
            }else{
                window.location.href = '/login'
            }
        }

        fetchUser()
    }, []);

    async function addMoney(){
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:3001/api/game/me/coins',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ amount: 5 })
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
        const response = await fetch('http://localhost:3001/api/game/me/coins',{
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
            await fetch("http://localhost:3001/api/game/logout", { method: "POST" });

            localStorage.removeItem("token");

            window.location.href = "/login";
        } catch (error) {
            console.error(error);
        }
    };

    async function changeStage(stage){
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/api/game/upgrade`, {
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
            spaceshipWindowImage.style.opacity = 1
            if (money >= 50) {
                setCurrentButton(upgradeButton50)
            } else {
                setCurrentButton(upgradeButton50disabled)
            }
        }
        if(upgradedStage == 3){
            setCurrentButton(upgradeButton0)
            setBackground("")
            spaceshipWindowImage.style.opacity = 1
            blackCatImage.style.opacity = 1
        }
    }

    function useMoney(){
        if(upgradedStage == 1 && money >= 20) {
            setMoney(money - 20)
            setUpgradedStage(2)
            changeStage(2)
            setBackground(background2)
            spaceshipWindowImage.style.opacity = 1
            removeMoney(-20)
        }
        if(upgradedStage == 2 && money >= 50) {
            setMoney(money - 50)
            setUpgradedStage(3)
            changeStage(3)
            setBackground("")
            blackCatImage.style.opacity = 1
            removeMoney(-50)
        }
    }

    useEffect(changeButton)
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

    return(
        <div className="relative min-h-screen bg-background text-text flex flex-col items-center justify-center overflow-hidden">
            {/* Fade-in white overlay */}
            <div
                className={`fixed inset-0 bg-white z-50 transition-opacity duration-1000 pointer-events-none ${
                    fadeOverlayVisible ? 'opacity-100' : 'opacity-0'
                }`}
            />
            <div style={{backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh'}}>
                <h1 className={'money'}>${money}</h1>
                <img id={'upgradeButton'} src={currentButton} onClick={useMoney}/>
                <img id={'blackCat'} src={blackcat}/>
                <img id={'spaceshipWindow'} src={spaceshipWindow}/>
                <button onClick={addMoney}>+money</button>
                <button onClick={handleLoguout}>logout</button>
            </div>
        </div>
    );
}

export default UpgradePage;