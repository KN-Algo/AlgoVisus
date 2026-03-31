import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SquareArrowLeft, Eye, EyeOff } from "lucide-react";



export default function EyeAccommodation() {

    // STANY APLIKACJI
    const [status, setStatus] = useState("start");
    const [timeLeft, setTimeLeft] = useState(10); // 10s - 1 cykl
    const [cycle, setCycle] = useState(1);
    const maxCycles = 6;


    // TIMER 
    useEffect(() => {
        let timer;
        // Sprawdzamy, czy trening jest aktywny i czy czas jest > 0
        if (status === "near" || status === "far") {
            if (timeLeft > 0) {
                timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
            } else {
                // przelaczamy etap
                switchStep();
            }
        }
        return () => clearTimeout(timer); // CZYSZCZENIE TIMERU PO ZAKONCZENIU TRENINGU
    }, [timeLeft, status]);


    // FUNKCJA PRZEŁĄCZAJĄCA ETAPY
    const switchStep = () => {
        if (status === "near") {
            // faza blisko --> faza daleko
            setStatus("far");
            setTimeLeft(10);
        } else if (status === "far") {
            if (cycle >= maxCycles) {
                // koniec treningu
                setStatus("finished");
            } else {
                // zwiekszamy cykl i wracamy do fazy blisko
                setCycle(prev => prev + 1);
                setStatus("near");
                setTimeLeft(10);
            }
        }
    };

    // FUNKCJA ZACZYNAJĄCA TRENING
    const startTraining = () => {
        setCycle(1);
        setTimeLeft(10);
        setStatus("near");
    };



    return (

        <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center p-10 relative">

            {/* Przycisk powrotu do AlgoVisus - strona glowna */}
            <Link
                to="/App"
                className="absolute left-6 top-10 p-3 bg-white text-black rounded-full 
                flex items-center justify-center shadow-lg active:scale-95 transition-all hover:bg-gray-50"
            >
                <SquareArrowLeft size={20} strokeWidth={2} />
            </Link>

            {/* NAZWA ĆWICZENIA */}
            <h1 className="text-4xl font-bold mb-6">Trening Akomodacji</h1>


            {/* INSTRUKCJA*/}
            {status === "start" && (
                <div className="max-w-md w-full animate-in fade-in ">

                    {/* OPIS TRENINGU */}
                    <p className="text-lg text-gray-700 mb-10 max-w-2xl text-center">
                        Ćwiczenie rozluźnia napięte mięśnie oka i poprawia zdolność do
                        szybkiego łapania ostrości przy długiej pracy przy komputerze.
                    </p>

                    <div className="bg-white/5 rounded-2xl mb-8">
                        <h2 className="text-gray-900 font-bold mb-4">Przygotowanie</h2>

                        <div className="space-y-4 text-sm">
                            {/* PUNKT 1*/}
                            <div className="flex gap-3">
                                <span>🪑</span>
                                <p>Usiądź prosto przy oknie (obiekt oddalony o min. 6 metrów).</p>
                            </div>

                            {/* PUNKT 2*/}
                            <div className="flex gap-3">
                                <span>📱</span>
                                <p>Trzymaj urządzenie na wysokosci ok. 25-30 cm od twarzy.</p>
                            </div>
                        </div>
                    </div>

                    {/* PRZYCISCKI ROZPOCZYNIAJĄCY I KOŃCZĄCY TRENING */}
                    <div className="flex gap-4">
                        <button
                            onClick={startTraining}
                            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors">
                            Rozpocznij Trening
                        </button>

                        <button className="bg-gray-300 text-black px-6 py-3 rounded hover:bg-gray-400 transition-colors">
                            Zakończ Trening
                        </button>
                    </div>
                </div>
            )}
        </div>

    )
}
