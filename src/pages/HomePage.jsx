import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import SterrenBG from "../component/SterrenBG.jsx";
import {getUserCoins} from "../api.js";

const HomePage = () => {
    useEffect(() => {
        async function fetchUser(){
            const token = localStorage.getItem('token')
            const response = await fetch('https://planeetwiskunde-backend.onrender.com/api/game/me',{
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            if(response.ok){
                const user = await response.json()
                setUser(user)
                console.log('ingelogd', user)
                setLoading(false);
            }else{
                window.location.href = '/login'
            }
        }

        fetchUser()
    }, []);

    const navigate = useNavigate();
    const [startTransition, setStartTransition] = useState(false);
    const [startLaunch, setStartLaunch] = useState(false);
    const [moveRocket, setMoveRocket] = useState(false);
    const [user, setUser] = useState()
    const [coins, setCoins] = useState(0);

    useEffect(() => {
        const fetchCoins = async () => {
            const userId = localStorage.getItem("userId");
            if (userId) {
                const result = await getUserCoins(userId);
                console.log('Coin response:', result);

                // Adjust this line based on your API response
                const actualCoins = result.coins ?? result.user?.coins;

                if (actualCoins !== undefined) {
                    setCoins(actualCoins);
                }
            }
        };
        fetchCoins();
    }, []);

    const handleRocketClick = () => {
        setStartTransition(true);
        setTimeout(() => {
            navigate("/upgrade");
        }, 1500); // wacht tot animatie voorbij is
    };

    const handleLanceerClick = () => {
        setStartLaunch(true)
        setTimeout(() => {
            setMoveRocket(true);
        }, 3000);

        setTimeout(() => {
            navigate("/levels");
        }, 5000); // wacht tot animatie voorbij is
    };

    async function handleLogout(){
        try {
            await fetch("https://planeetwiskunde-backend.onrender.com/api/game/logout", { method: "POST" });

            localStorage.removeItem("token");

            window.location.href = "/login";
        } catch (error) {
            console.error(error);
        }
    }
    const [loading, setLoading] = useState(true);
    if (loading) return null
    return (
        <div className="relative min-h-screen overflow-hidden">
            <SterrenBG versneld={startLaunch} />

            {/* Witte fade overlay */}
            <div
                className={`fixed inset-0 bg-white transition-opacity duration-1000 pointer-events-none z-50 ${
                    startTransition ? "opacity-100" : "opacity-0"
                }`}
            ></div>

            {/* Content met zoom-effect op raketpositie */}
            <main
                className={`relative z-10 min-h-screen transition-transform ease-in-out transform ${
                    startLaunch
                        ? "scale-[2] origin-[85%_40%] duration-[5000ms]"
                        : startTransition
                            ? "scale-[2] origin-[85%_40%] duration-[1500ms]"
                            : ""
                }`}
            >

                <h1 className="mt-16 ml-10 text-white text-7xl drop-shadow-[1px_1px_2px_black]">
                    Ruimte voor rekenen
                </h1>

                <img
                    src="Profile.png"
                    alt="Profiel"
                    className="absolute top-1 right-10 w-12 h-12 rounded-full shadow-lg"
                    onClick={handleLogout}
                />
                <div
                    className="absolute top-4 right-28 bg-yellow-300 text-black font-bold py-2 px-4 rounded-full shadow-lg text-lg z-20">
                    🪙 {coins}
                </div>

                <div className="ml-20 mt-14 flex flex-col space-y-10">
                    {/* Lanceer knop */}
                    <div
                        className="relative inline-block transform transition-transform duration-300 hover:scale-110 w-[320px]">
                        <div
                            className="absolute top-1 left-1 bg-orange-500 skew-x-[-12deg] rounded p-11 w-full h-full z-0"></div>
                        <button
                            className="relative bg-yellow-400 skew-x-[-12deg] rounded px-16 py-6 text-xl font-bold text-black z-10 w-full"
                            onClick={handleLanceerClick}
                        >
                            <span className="skew-x-[12deg] text-3xl block">Lanceer!</span>
                        </button>
                    </div>

                    {/* Raket knop met animatie */}
                    <div
                        className="relative inline-block transform transition-transform duration-300 hover:scale-110 w-[240px]">
                        <div
                            className="absolute top-1 left-1 bg-RaketRedBtn skew-x-[-12deg] rounded p-11 w-full h-full z-0"></div>
                        <button
                            onClick={handleRocketClick}
                            className="relative bg-RaketOrangeBtn skew-x-[-12deg] rounded px-12 py-6 text-lg font-bold text-black z-10 w-full"
                        >
                            <span className="skew-x-[12deg] text-2xl block">Raket</span>
                        </button>
                    </div>

                    {/* Administratie knop */}
                    {user && user.role !== 0 && (
                        <div
                            className="relative inline-block transform transition-transform duration-300 hover:scale-110 w-[240px]">
                            <div
                                className="absolute top-1 left-1 bg-RaketBlueBtn skew-x-[-12deg] rounded p-11 w-full h-full z-0"></div>
                            <button
                                className="relative bg-RaketGreenBtn skew-x-[-12deg] rounded px-12 py-6 text-lg font-bold text-black z-10 w-full"
                                onClick={() => navigate('/overview')}
                            >
                                <span className="skew-x-[12deg] text-2xl block">Administratie</span>
                            </button>
                        </div>
                    )}
                </div>
                <div
                    className={`absolute top-1/3 right-[275px] transform transition-transform ease-in-out ${
                        moveRocket ? "duration-[2500ms] -translate-y-[800px]" : "duration-[0ms] -translate-y-1/2"
                    }`}
                >
                    <div className="relative w-80 h-auto">
                        <img
                            src="/testRaket.png"
                            alt="Raket"
                            className="w-80 h-auto relative z-10"
                        />
                        <img
                            src="/flame.gif"
                            alt="Flame"
                            className="w-20 h-auto absolute left-1/2 -translate-x-1/2 top-full -mt-32 rotate-180 z-0"
                        />
                    </div>
                </div>

            </main>
        </div>
    );
};

export default HomePage;