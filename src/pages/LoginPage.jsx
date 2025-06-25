import React, { useState } from "react";
import SterrenBG from "../component/SterrenBG.jsx";

const LoginPage = () => {
    const [formData, setFormData] = useState({ name: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");

    async function handleLogin() {
        try {
            const response = await fetch("https://planeetwiskunde-backend.onrender.com/api/game/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json", // fix casing
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                localStorage.setItem('userId', data.user._id); // Add this line


                localStorage.setItem("token", token);
                localStorage.setItem('userId', data.user._id);
                console.log("Ingelogd:", data.user.name);

                setErrorMessage("");
                window.location.href = "/";
            } else {
                setErrorMessage("Login mislukt. Check of je gegevens kloppen.");
            }
        } catch (err) {
            setErrorMessage("Er ging iets mis bij het inloggen.");
            console.error(err);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div>
        <form id="loginContainer" onSubmit={handleSubmit}>
            <h1 className="login-title">Login</h1>
            <input
                name="name"
                className="login-input"
                value={formData.name}
                placeholder="Gebruikersnaam"
                onChange={handleInput}
            />
            <input
                name="password"
                type="password" // ⬅️ Important for security
                className="login-input"
                value={formData.password}
                placeholder="Wachtwoord"
                onChange={handleInput}
            />
            <button id="loginButton" type="submit">
                Aan de slag
            </button>
            {errorMessage && (
                <p style={{ color: "red", marginTop: "1em" }}>{errorMessage}</p>
            )}
        </form>
        </div>
    );
};

export default LoginPage;