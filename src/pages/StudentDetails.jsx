import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Student() {
    const { id } = useParams();
    const userId = parseInt(id);
    const [user, setUser] = useState(null);
    const [scores, setScores] = useState([]);

    async function fetchData() {
        try {
            const response = await fetch("/test.json", {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
            });
            const data = await response.json();

            const foundUser = data.users.find((u) => u.id === userId);
            const userScores = data.scores.filter((s) => s.user_id === userId);
            setUser(foundUser);
            setScores(userScores);
        } catch (error) {
            console.error("Fout bij het ophalen van studentgegevens:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [userId]);

    if (!user) return <div className="text-white p-4">Gebruiker niet gevonden...</div>;

    return (
        <div className="bg-background min-h-screen p-8">
            <div className="w-3/5 bg-white mx-auto p-4 rounded-lg">
                <h1 className="text-black text-2xl font-bold mb-4">
                    Resultaten van {user.name}
                </h1>
                {scores.length > 0 ? (
                    <ul className="text-black">
                        {scores.map((score) => (
                            <li
                                key={score.id}
                                className="bg-gray-200 p-4 m-2 rounded shadow"
                            >
                                <p className="mb-2">
                                    🎮 {score.game} — {score.score} punten (poging {score.attempt})
                                </p>
                                <div className="w-full bg-gray-300 h-4 rounded">
                                    <div
                                        className={`h-4 rounded ${
                                            score.score <= 30 ? "bg-red-500" : score.score <= 70 ? "bg-orange-400" : "bg-green-500"
                                        }`}
                                        style={{ width: `${score.score}%` }}
                                    ></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-black">Geen scores gevonden.</p>
                )}
            </div>
        </div>
    );
}

export default Student;