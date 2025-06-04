import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SterrenBG from "../component/sterrenBG.jsx";

const HomePage = () => {
    const navigate = useNavigate();
    const [startTransition, setStartTransition] = useState(false);

    const handleRocketClick = () => {
        setStartTransition(true);
        setTimeout(() => {
            navigate("/upgrade");
        }, 1500); // wacht tot animatie voorbij is
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            <SterrenBG />

            {/* Witte fade overlay */}
            <div
                className={`fixed inset-0 bg-white transition-opacity duration-1000 pointer-events-none z-50 ${
                    startTransition ? "opacity-100" : "opacity-0"
                }`}
            ></div>

            {/* Content met zoom-effect op raketpositie */}
            <main
                className={`relative z-10 min-h-screen transition-transform duration-[1500ms] ease-in-out transform ${
                    startTransition ? "scale-[2] origin-[85%_40%]" : ""
                }`}
            >
                <h1 className="mt-16 ml-10 text-white text-7xl drop-shadow-[1px_1px_2px_black]">
                    Ruimte voor rekenen
                </h1>

                <img
                    src="Profile.png"
                    alt="Profiel"
                    className="absolute top-1 right-10 w-12 h-12 rounded-full shadow-lg"
                />

                <div className="ml-20 mt-14 flex flex-col space-y-10">
                    {/* Lanceer knop */}
                    <div className="relative inline-block transform transition-transform duration-300 hover:scale-110 w-[320px]">
                        <div className="absolute top-1 left-1 bg-orange-500 skew-x-[-12deg] rounded p-11 w-full h-full z-0"></div>
                        <button className="relative bg-yellow-400 skew-x-[-12deg] rounded px-16 py-6 text-xl font-bold text-black z-10 w-full">
                            <span className="skew-x-[12deg] text-3xl block">Lanceer!</span>
                        </button>
                    </div>

                    {/* Raket knop met animatie */}
                    <div className="relative inline-block transform transition-transform duration-300 hover:scale-110 w-[240px]">
                        <div className="absolute top-1 left-1 bg-RaketRedBtn skew-x-[-12deg] rounded p-11 w-full h-full z-0"></div>
                        <button
                            onClick={handleRocketClick}
                            className="relative bg-RaketOrangeBtn skew-x-[-12deg] rounded px-12 py-6 text-lg font-bold text-black z-10 w-full"
                        >
                            <span className="skew-x-[12deg] text-2xl block">Raket</span>
                        </button>
                    </div>

                    {/* Administratie knop */}
                    <div className="relative inline-block transform transition-transform duration-300 hover:scale-110 w-[240px]">
                        <div className="absolute top-1 left-1 bg-RaketBlueBtn skew-x-[-12deg] rounded p-11 w-full h-full z-0"></div>
                        <button className="relative bg-RaketGreenBtn skew-x-[-12deg] rounded px-12 py-6 text-lg font-bold text-black z-10 w-full">
                            <span className="skew-x-[12deg] text-2xl block">Administratie</span>
                        </button>
                    </div>
                </div>

                {/* Raket afbeelding */}
                <img
                    src="testRaket.png"
                    alt="Raket"
                    className="absolute top-1/3 right-[275px] transform -translate-y-1/2 w-80 h-auto"
                />
            </main>
        </div>
    );
};

export default HomePage;
