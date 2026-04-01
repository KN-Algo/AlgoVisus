import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SquareArrowLeft } from "lucide-react";


// DZWIĘK 
function sound(freq: number, duration: number) {
    try {
        const ctx = new AudioContext();
        const play = () => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = freq;
            osc.type = "sine";
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + duration);
        };
        if (ctx.state === "suspended") {
            ctx.resume().then(play);
        } else {
            play();
        }
    } catch (error) {
        console.error("Błąd dźwięku:", error);
    }
}

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
            sound(660,0.4);
            setStatus("far");
            setTimeLeft(10);
        } else if (status === "far") {
            if (cycle >= maxCycles) {
                // koniec treningu
                sound(440,0.8);
                setStatus("finished");
            } else {
                // zwiekszamy cykl i wracamy do fazy blisko
                sound(880,0.3);
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
        sound(880,0.3);
        setStatus("near");
    };


    // PROGRES 
    const progress = ((10 - timeLeft) / 10) * 100; // progres w procentach
    const totalPhases = maxCycles * 2; // liczba wszystkich faz
    const currentPhase = (cycle - 1) * 2 + (status === "near" ? 1 : 2); // numer aktualnej fazy

    return (

        // div główny
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


                    {/* PRZEBIEG TRENINGU */}
                    <h2 className="text-gray-900 font-bold mb-4">
                        Przebieg treningu
                    </h2>
                    <div className="space-y-4 text-sm text-gray-700">
                        {/* PUNKT 1*/}
                        <div className="flex gap-3">
                            <div className="w-3 h-3 mt-1 rounded-full bg-blue-400 shrink-0" />
                            <p>Dźwięk A (Blisko): Skup wzrok na punkcie na ekranie. Poczekaj aż obraz będzie idealnie ostry.</p>
                        </div>

                        {/* PUNKT 2*/}
                        <div className="flex gap-3">
                            <div className="w-3 h-3 mt-1 rounded-full bg-emerald-500 shrink-0" />
                            <p>Dźwięk B (Daleko): Przenieś wzrok na obiekt za oknem. Poczekaj aż obraz „skoczy" i stanie się wyraźny.</p>
                        </div>

                        {/* PUNKT 3*/}
                        <div className="flex gap-3">
                            <span>🔁</span>
                            <p>Zmiana następuje co 10 sekund. Wykonasz 6 powtórzeń (łącznie 2 minuty).</p>
                        </div>
                    </div>


                    {/* PRZYCISCKI ROZPOCZYNIAJĄCY I KOŃCZĄCY TRENING */}
                    <div className="flex gap-4">
                        <button
                            onClick={startTraining}
                            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors">
                            Rozpocznij Trening
                        </button>

                        <Link
                            to="/App"
                            className="bg-gray-300 text-black px-6 py-3 rounded hover:bg-gray-400 transition-colors">
                            Zakończ Trening
                        </Link>
                    </div>

                </div> 
            )}



            {/* FAZA BLISKO - NEAR */}
            {status === "near" && (
                <div className="flex flex-col items-center gap-8">

                    {/* POSTĘP */}
                    <div className="flex flex-col items-center gap-1">
                            {/* POSTĘP - AKTUALNY ETAP */}
                        <span className="text-gray-400 text-xs tracking-widest">
                            {currentPhase} / {totalPhases} 
                        </span>
                        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-400 rounded-full transition-all duration-500"
                                style={{ width: `${(currentPhase / totalPhases) * 100}%` }}
                            />
                        </div>
                    </div>


                    {/* PUNKT - NIEBIESKA KROPKA */}
                    <div
                        className="w-24 h-24 rounded-full bg-blue-400"
                        style={{ boxShadow: "0 0 60px 20px rgba(96,165,250,0.4)" }}
                    />

                    <div className="text-center">
                        <p className="text-2xl font-semibold text-gray-800">Patrz na punkt</p>
                        <p className="text-gray-400 text-sm mt-1">Skup wzrok na niebieskiej kropce</p>
                    </div>


                    {/* TIMER */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-6xl font-bold text-gray-800 tabular-nums">{timeLeft}</span>
                        <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-400 rounded-full transition-all duration-1000"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* PRZERWANIE TRENINGU - POWRÓT DO STARTU */}
                    <button
                        onClick={() => setStatus("start")}
                        className="text-gray-400 text-sm hover:text-gray-900 transition-colors"
                    >
                        Przerwij trening
                    </button>
                </div>
            )}



            {/* FAZA DALEKO - FAR */}
            {status === "far" && (
                <div className="flex flex-col items-center gap-8">

                    {/* POSTĘP */}
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-gray-400 text-xs tracking-widest">
                            {currentPhase} / {totalPhases}
                        </span>
                        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                                style={{ width: `${(currentPhase / totalPhases) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* PUNKT - ZIELONA KROPKA */}
                    <div
                        className="w-14 h-14 rounded-full bg-emerald-400"
                        style={{
                            boxShadow: "0 0 60px 20px rgba(52,211,153,0.4)",
                            filter: "blur(4px)",
                        }}
                    />

                    <div className="text-center">
                        <p className="text-2xl font-semibold text-gray-800">Spójrz w dal</p>
                        <p className="text-gray-400 text-sm mt-1">Jak najdalej — minimum 6 metrów</p>
                    </div>

                     {/* TIMER */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-6xl font-bold text-gray-800 tabular-nums">{timeLeft}</span>
                        <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-emerald-400 rounded-full transition-all duration-1000"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>


                    {/* PRZERWANIE TRENINGU - POWRÓT DO STARTU */}
                    <button
                        onClick={() => setStatus("start")}
                        className="text-gray-400 text-sm hover:text-gray-600 transition-colors"
                    >
                        Przerwij trening
                    </button>
                </div>
            )}



            {/* FINISHED */}
            {status === "finished" && (
                <div className="flex flex-col items-center gap-8 text-center max-w-sm">
                    <div
                        className="w-20 h-20 rounded-full bg-emerald-400"
                        style={{ boxShadow: "0 0 60px 20px rgba(52,211,153,0.3)" }}
                    />
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Gotowe! 👁️</h2>
                        <p className="text-gray-800 text-sm leading-relaxed">
                            Ukończyłeś trening akomodacji. Twoje oczy wykonały{" "}
                           {maxCycles * 2} zmian ostrości w ciągu 2 minut.
                        </p>
                    </div>


                    {/* POWTÓRZ -- POWRÓT DO STARTU */}
                    <div className="flex gap-4">
                        <button
                            onClick={startTraining}
                            className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors font-medium"
                        >
                            Powtórz
                        </button>
                        <Link
                            to="/App"
                            className="bg-gray-200 text-black px-6 py-3 rounded-xl hover:bg-gray-300 transition-colors font-medium text-center"
                        >
                            Wróć do menu
                        </Link>
                    </div>
                </div>
            )}

        </div> 
    )
}