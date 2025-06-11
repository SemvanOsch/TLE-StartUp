import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

function CreateStudent(){
    const navigate= useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        password: '',
        role: 0,
        classCode: '',
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    async function postUser(data) {
        try {
            const response = await fetch('http://localhost:3001/api/game/user', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log('leerling gemaakt')
        } catch (error) {
            console.error('Fout bij het ophalen van studenten:', error);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await postUser(formData);
        navigate(`/overview`);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6 mt-8">
            <div className={"flex flex-row-reverse justify-end gap-12"}>
                <h2 className="text-2xl font-bold text-center text-gray-800">Leerling Toevoegen</h2>
                <a href="/overview">
                    <img src="/backarrow.jpg" alt="back-arrow" className="h-8 w-8" />
                </a>
            </div>
            <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Naam
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Wachtwoord
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="classCode" className="block text-sm font-medium text-gray-700">
                    Klassencode
                </label>
                <input
                    type="text"
                    id="classCode"
                    name="classCode"
                    value={formData.classCode}
                    onChange={handleInputChange}
                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 font-semibold"
            >
                Leerling Toevoegen
            </button>
        </form>

    )
}

export default CreateStudent