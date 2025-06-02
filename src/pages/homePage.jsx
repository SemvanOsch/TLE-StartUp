import SterrenBG from "../component/sterrenBG.jsx";

const HomePage = () => {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <SterrenBG />

            {/* Content boven de achtergrond */}
            <main className="relative z-10 min-h-screen">
                <h1 className="mt-6 ml-6 text-white text-7xl">Ruimte voor rekenen</h1>

                <div className="relative inline-block ml-14 mt-14 transform transition-transform duration-300 hover:scale-105">
                    <div className="absolute top-1 left-1 bg-orange-500 skew-x-[-12deg] rounded p-10 w-[102%] h-full z-0"></div>

                    <button className="relative bg-yellow-400 skew-x-[-12deg] rounded px-16 py-6 text-xl font-bold text-black z-10">
                        <span className="skew-x-[12deg] text-3xl block">Lanceer!</span>
                    </button>
                </div>

            </main>
        </div>
    );
};

export default HomePage;
