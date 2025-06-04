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
    const [money, setMoney] = useState(15)
    const [currentButton, setCurrentButton] = useState()
    const [upgradedStage, setUpgradedStage] = useState(1)
    const [background, setBackground] = useState(background1)

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

    useEffect(changeButton)


    return(
        <div style={{backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh'}}>
            <h1 className={'money'}>${money}</h1>
            <img id={'upgradeButton'} src={currentButton} onClick={useMoney}/>
            <img id={'blackCat'} src={blackcat}/>
            <img id={'spaceshipWindow'} src={spaceshipWindow}/>
            <button onClick={addMoney}>+money</button>
        </div>
    );
}

export default UpgradePage;