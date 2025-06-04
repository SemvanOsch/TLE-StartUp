import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SterrenBG from "../components/SterrenBG.jsx";

function Student() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [scores, setScores] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const userRes = await fetch(`http://localhost:3001/api/game/user/${id}`, {
                    headers: {
                        Accept: "application/json"
                    }
                });
                const userData = await userRes.json();
                setUser(userData.user);

                const scoresRes = await fetch(`http://localhost:3001/api/game/scores/${id}`, {
                    headers: {
                        Accept: "application/json"
                    }
                });
                const scoresData = await scoresRes.json();
                setScores(scoresData);
            } catch (error) {
                console.error("Fout bij het ophalen van studentgegevens:", error);
            }
        }

        fetchData();
    }, [id]);

    if (!user) return <div className="text-white p-4">Gebruiker niet gevonden...</div>;

    return (
        <div className="relative bg-background min-h-screen p-8">
            <SterrenBG />
            <div className="relative z-10 w-3/5 bg-white mx-auto p-4 rounded-lg">
                <h1 className="text-black text-2xl flex gap-4 font-bold mb-4">
                    <a href="/overview">
                        <img src="/backarrow.jpg" alt="back-arrow" className="h-8 w-8" />
                    </a>
                    Resultaten van {user.name}
                </h1>
                {scores.length > 0 ? (
                    <ul className="text-black">
                        {scores.map((score, index) => (
                            <li
                                key={index}
                                className="bg-gray-200 p-4 m-2 rounded shadow"
                            >
                                <p className="mb-2">
                                    🎮 {score.game} — {score.score } Punten
                                </p>
                                <div className="w-full bg-gray-300 h-4 rounded">
                                    <div
                                        className={`h-4 rounded ${score.score <= 30 ? "bg-red-500" : score.score <= 60 ? "bg-orange-400" : "bg-green-500"}`}
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
