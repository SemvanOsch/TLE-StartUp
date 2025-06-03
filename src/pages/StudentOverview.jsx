import { useEffect, useState } from "react";

function StudentOverview(){
    const [users, setUsers] = useState([]);

    async function fetchData() {
        try {
            const response = await fetch('/test.json', {
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
        <div className="bg-background min-h-screen p-8">
            <div className="w-3/5 bg-white mx-auto p-4 rounded-lg">
                <h1 className="text-black text-2xl font-bold mb-4">Leerlingen</h1>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map((user, index) => (
                        <a
                            key={index}
                            href={`/student/${user.id}`}
                            className="text-black bg-gray-300 h-40 flex flex-col items-center justify-center rounded-md hover:bg-gray-400 transition no-underline"
                        >
                            <img
                                src="/pfp.png"
                                alt="user-face"
                                className="w-16 h-16 rounded-full object-cover mb-2"
                            />
                            <span className="text-lg font-semibold text-center">
        {user.name}
      </span>
                        </a>
                    ))}
                </ul>
            </div>
        </div>

    )
}

export default StudentOverview