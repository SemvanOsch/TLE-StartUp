import {useState} from "react";
const LoginPage = () => {

    const [formData, setFormData] = useState({name: '', password: ''})

    async function handleLogin(){
            const response = await fetch('http://localhost:3001/api/game/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if(response.ok){
                const data = await response.json()
                const token = data.token

                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(data.user))

                console.log('ingelogd', token)
            }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin()
    }

    function handleInput(event){
        const {name, value} = event.target
        setFormData({
            ...formData,
            [name]: value
        });
    }

    return(
        <form id={'loginContainer'} onSubmit={handleSubmit}>
          <h1 className={'login-title'}>Login</h1>
          <input name={'name'} className={'login-input'} value={formData.name} placeholder={'Gebruikersnaam'} onChange={handleInput}/>
          <input name={'password'} className={'login-input'} value={formData.password} placeholder={'Wachtwoord'} onChange={handleInput}/>
          <button id={'loginButton'}>Aan de slag</button>
        </form>
    );
}

export default LoginPage