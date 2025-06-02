import { useState, useEffect } from 'react';
import upgradeButton20 from '/src/images/upgrade20.png'
import upgradeButton20disabled from '/src/images/upgrade20disabled.png'

const UpgradePage = () => {
    const [money, setMoney] = useState(20)
    const [currentButton, setCurrentButton] = useState()

    function changeButton(){
        if (money >= 14){
            setCurrentButton(upgradeButton20)
        }else{
            setCurrentButton(upgradeButton20disabled)
        }
    }

    useEffect(changeButton)


return(
    <div>
    <h1>upgrade</h1>
    <img src={currentButton}/>
    </div>
);
}

export default UpgradePage;