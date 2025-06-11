import { useEffect, useState } from "react";
import SterrenBG from "../component/SterrenBG.jsx";

function StudentOverview(){
    const [users, setUsers] = useState([]);
    async function fetchData() {
        try {
            const response = await fetch('http://localhost:3001/api/game/users', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.error('Fout bij het ophalen van studenten:', error);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div className="relative bg-background min-h-screen p-8">
            {/*<SterrenBG/>*/}
            <div className="relative z-10 w-3/5 bg-white mx-auto p-4 rounded-lg">
                <div className={"flex justify-between content-center"}>
                    <h1 className="text-black text-2xl font-bold mb-4">Leerlingen</h1>
                    <a className={"bg-green-500 hover:bg-green-700 flex items-center p-3 rounded-md mb-1"} href={"/student/create"}>Create</a>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map((user, index) => (
                        <a
                            key={index}
                            href={`/student/${user._id}`}
                            className="text-black bg-gray-300 h-40 flex flex-col items-center justify-center rounded-md hover:bg-gray-400 transition no-underline"
                        >
                            <img
                                src="/pfp.png"
                                alt="user-face"
                                className="w-16 h-16 rounded-full object-cover mb-2"
                            />
                            <span className="text-lg font-semibold text-center">{user.name}</span>
                        </a>
                    ))}
                </ul>
            </div>
        </div>

    )
}

export default StudentOverview