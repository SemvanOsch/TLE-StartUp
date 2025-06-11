import { useState, useEffect } from 'react';
import upgradeButton20 from '/src/images/upgrade20.png'
import upgradeButton20disabled from '/src/images/upgrade20disabled.png'

const UpgradePage = () => {
    const [money, setMoney] = useState(15)
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
            if (money >= 50) {
                setCurrentButton(upgradeButton50)
            } else {
                setCurrentButton(upgradeButton50disabled)
            }
        }
        if(upgradedStage == 3){
            setCurrentButton(upgradeButton0)
        }
    }
    function addMoney(){
        setMoney(money + 5)
    }
    function useMoney(){
        if(upgradedStage == 1 && money >= 20) {
            setMoney(money - 20)
            setUpgradedStage(2)
            setBackground(background2)
            spaceshipWindowImage.style.opacity = 1
        }
        if(upgradedStage == 2 && money >= 50) {
            setMoney(money - 50)
            setUpgradedStage(3)
            setBackground("")
            blackCatImage.style.opacity = 1
        }
    }

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
            </div>
        </div>
    );
}

export default UpgradePage;