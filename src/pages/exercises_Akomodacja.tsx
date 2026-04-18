import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { useTimer } from "../hooks/useTimer";
import { GradientButton } from "@/components/ui/gradient-button";
import { FooterSection } from "./_components/FooterSection";

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
  const [cycle, setCycle] = useState(1);
  const maxCycles = 6;

  // HOOK Timer
  const { time, start, stop, reset } = useTimer(
    {
      hour: 0,
      minut: 0,
      second: 10,
    },
    "accommodation-timer",
  );

  const timeLeftInSeconds = Math.ceil(time / 1000);

  // TIMER
  useEffect(() => {
    if (status !== "near" && status !== "far") return;
    if (time > 0) return;

    if (status === "near") {
      sound(660, 0.4);
      setStatus("far");
      reset();
      start();
    } else if (status === "far") {
      if (cycle >= maxCycles) {
        sound(440, 0.8);
        setStatus("finished");
        stop();
      } else {
        sound(880, 0.3);
        setCycle((prev) => prev + 1);
        setStatus("near");
        reset();
        start();
      }
    }
  }, [time]);

  // FUNKCJA ZACZYNAJĄCA TRENING
  const startTraining = () => {
    setCycle(1);
    reset();
    sound(880, 0.3);
    setStatus("near");
    start();
  };

  // FUNKCJA KOŃCZĄCA TRENING
  const stopTraining = () => {
    stop();
    reset();
    setStatus("start");
  };

  // PROGRES
  const progress = ((10 - timeLeftInSeconds) / 10) * 100; // progres w procentach
  const totalPhases = maxCycles * 2; // liczba wszystkich faz
  const currentPhase = (cycle - 1) * 2 + (status === "near" ? 1 : 2); // numer aktualnej fazy

  return (
    <div className="w-full">
      {status === "start" && (
        // div główny - widok początkowy
        <section className="relative w-full min-h-screen overflow-hidden animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
          </div>

          <div className="relative flex min-h-[calc(100vh-4rem)] items-start justify-center px-4 pb-16 pt-10 lg:pb-20 lg:pt-14">
            <div className="w-full max-w-5xl">
              <div
                className="mb-10 flex justify-center animate-fade-in-up"
                style={{
                  animationDelay: "100ms",
                  animationFillMode: "backwards",
                }}
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/70 bg-white/80 shadow-[0_14px_30px_rgba(79,70,229,0.12)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_18px_36px_rgba(79,70,229,0.18)] md:h-28 md:w-28">
                  <Eye className="h-11 w-11 text-blue-600 md:h-14 md:w-14" />
                </div>
              </div>

              <h1
                className="mb-6 text-center text-4xl font-bold leading-tight text-slate-900 animate-fade-in-up md:text-5xl lg:text-6xl"
                style={{
                  animationDelay: "200ms",
                  animationFillMode: "backwards",
                }}
              >
                Trening
                <span className="block bg-gradient-to-r from-blue-700 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                  Akomodacji
                </span>
              </h1>

              <p
                className="mx-auto mb-4 max-w-3xl text-center text-lg leading-relaxed text-slate-600 animate-fade-in-up md:text-xl"
                style={{
                  animationDelay: "300ms",
                  animationFillMode: "backwards",
                }}
              >
                Ćwiczenie rozluźnia napięte mięśnie oka i poprawia zdolność do
                szybkiego łapania ostrości przy długiej pracy przy komputerze.
              </p>

              <div
                className="mx-auto mb-12 max-w-sm animate-fade-in-up"
                style={{
                  animationDelay: "380ms",
                  animationFillMode: "backwards",
                }}
              >
                <div className="rounded-2xl border border-white/75 bg-white/80 p-5 text-center shadow-[0_14px_30px_rgba(79,70,229,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_18px_36px_rgba(79,70,229,0.12)]">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700/70">
                    Czas trwania
                  </p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    2 minuty
                  </p>
                </div>
              </div>

              <div
                className="mx-auto mb-12 max-w-2xl animate-fade-in-up"
                style={{
                  animationDelay: "420ms",
                  animationFillMode: "backwards",
                }}
              >
                <div className="rounded-2xl border border-white/75 bg-white/80 p-8 shadow-[0_14px_30px_rgba(79,70,229,0.08)] backdrop-blur-sm">
                  <h2 className="text-lg font-bold text-slate-900 mb-6">
                    Przygotowanie
                  </h2>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <span className="text-2xl shrink-0">🪑</span>
                      <p className="text-slate-700">
                        Usiądź prosto przy oknie (obiekt oddalony o min. 6
                        metrów).
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-2xl shrink-0">📱</span>
                      <p className="text-slate-700">
                        Trzymaj urządzenie na wysokości ok. 25-30 cm od twarzy.
                      </p>
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 mb-6 mt-8">
                    Przebieg treningu
                  </h2>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-3 h-3 mt-2 rounded-full bg-blue-500 shrink-0" />
                      <p className="text-slate-700">
                        <strong>Dźwięk A (Blisko):</strong> Skup wzrok na
                        punkcie na ekranie. Poczekaj aż obraz będzie idealnie
                        ostry.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-3 h-3 mt-2 rounded-full bg-emerald-500 shrink-0" />
                      <p className="text-slate-700">
                        <strong>Dźwięk B (Daleko):</strong> Przenieś wzrok na
                        obiekt za oknem. Poczekaj aż obraz „skoczy" i stanie się
                        wyraźny.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-xl shrink-0">🔁</span>
                      <p className="text-slate-700">
                        Zmiana następuje co 10 sekund. Wykonasz 6 powtórzeń
                        (łącznie 2 minuty).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="flex justify-center gap-4 animate-fade-in-up"
                style={{
                  animationDelay: "460ms",
                  animationFillMode: "backwards",
                }}
              >
                <GradientButton onClick={startTraining}>
                  Rozpocznij ćwiczenie
                </GradientButton>
                <Link
                  to="/App"
                  className="px-8 py-4 font-semibold rounded-lg text-slate-900 bg-white/80 border border-white/75 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 backdrop-blur-sm"
                >
                  Powrót
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAZA BLISKO - NEAR */}
      {status === "near" && (
        <section className="relative w-full min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
          </div>

          <div className="relative flex flex-col items-center justify-center min-h-screen px-4 gap-8">
            <div
              className="flex flex-col items-center gap-1 animate-fade-in-up"
              style={{
                animationDelay: "100ms",
                animationFillMode: "backwards",
              }}
            >
              <span className="text-slate-600 text-xs tracking-widest uppercase">
                {currentPhase} / {totalPhases} faz
              </span>
              <div className="w-64 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                  style={{ width: `${(currentPhase / totalPhases) * 100}%` }}
                />
              </div>
            </div>

            <div
              className="animate-fade-in-up"
              style={{
                animationDelay: "150ms",
                animationFillMode: "backwards",
              }}
            >
              <div
                className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400"
                style={{
                  boxShadow:
                    "0 0 80px 30px rgba(59,130,246,0.3), inset -2px -2px 5px rgba(0,0,0,0.1)",
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              />
            </div>

            <div
              className="text-center animate-fade-in-up"
              style={{
                animationDelay: "200ms",
                animationFillMode: "backwards",
              }}
            >
              <p className="text-3xl font-bold text-slate-900 md:text-4xl">
                Patrz na punkt
              </p>
              <p className="text-slate-600 text-lg mt-2">
                Skup wzrok na niebieskiej kropce
              </p>
            </div>

            <div
              className="flex flex-col items-center gap-3 animate-fade-in-up"
              style={{
                animationDelay: "250ms",
                animationFillMode: "backwards",
              }}
            >
              <span className="text-8xl font-bold text-slate-900 tabular-nums md:text-9xl">
                {timeLeftInSeconds}
              </span>
              <div className="w-72 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <button
              onClick={stopTraining}
              className="px-6 py-2 text-sm font-medium text-slate-900 bg-white/80 border border-white/75 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 backdrop-blur-sm animate-fade-in-up"
              style={{
                animationDelay: "300ms",
                animationFillMode: "backwards",
              }}
            >
              Przerwij trening
            </button>
          </div>
          <style>{`
                        @keyframes pulse {
                            0%, 100% {
                                transform: scale(1);
                            }
                            50% {
                                transform: scale(1.05);
                            }
                        }
                    `}</style>
        </section>
      )}

      {/* FAZA DALEKO - FAR */}
      {status === "far" && (
        <section className="relative w-full min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
          </div>

          <div className="relative flex flex-col items-center justify-center min-h-screen px-4 gap-8">
            <div
              className="flex flex-col items-center gap-1 animate-fade-in-up"
              style={{
                animationDelay: "100ms",
                animationFillMode: "backwards",
              }}
            >
              <span className="text-slate-600 text-xs tracking-widest uppercase">
                {currentPhase} / {totalPhases} faz
              </span>
              <div className="w-64 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                  style={{ width: `${(currentPhase / totalPhases) * 100}%` }}
                />
              </div>
            </div>

            <div
              className="animate-fade-in-up"
              style={{
                animationDelay: "150ms",
                animationFillMode: "backwards",
              }}
            >
              <div
                className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400"
                style={{
                  boxShadow:
                    "0 0 80px 30px rgba(16,185,129,0.3), inset -2px -2px 5px rgba(0,0,0,0.1)",
                  filter: "blur(1px)",
                  animation: "float 3s ease-in-out infinite",
                }}
              />
            </div>

            <div
              className="text-center animate-fade-in-up"
              style={{
                animationDelay: "200ms",
                animationFillMode: "backwards",
              }}
            >
              <p className="text-3xl font-bold text-slate-900 md:text-4xl">
                Spójrz w dal
              </p>
              <p className="text-slate-600 text-lg mt-2">
                Jak najdalej — minimum 6 metrów
              </p>
            </div>

            <div
              className="flex flex-col items-center gap-3 animate-fade-in-up"
              style={{
                animationDelay: "250ms",
                animationFillMode: "backwards",
              }}
            >
              <span className="text-8xl font-bold text-slate-900 tabular-nums md:text-9xl">
                {timeLeftInSeconds}
              </span>
              <div className="w-72 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <button
              onClick={stopTraining}
              className="px-6 py-2 text-sm font-medium text-slate-900 bg-white/80 border border-white/75 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 backdrop-blur-sm animate-fade-in-up"
              style={{
                animationDelay: "300ms",
                animationFillMode: "backwards",
              }}
            >
              Przerwij trening
            </button>
          </div>
          <style>{`
                        @keyframes float {
                            0%, 100% {
                                transform: translateY(0px);
                            }
                            50% {
                                transform: translateY(-10px);
                            }
                        }
                    `}</style>
        </section>
      )}

      {/* FINISHED */}
      {status === "finished" && (
        <section className="relative w-full min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
          </div>

          <div className="relative flex flex-col items-center justify-center min-h-screen px-4">
            <div
              className="text-center max-w-lg animate-fade-in-up"
              style={{
                animationDelay: "100ms",
                animationFillMode: "backwards",
              }}
            >
              <div
                className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 mx-auto mb-8"
                style={{
                  boxShadow:
                    "0 0 80px 30px rgba(16,185,129,0.2), inset -2px -2px 5px rgba(0,0,0,0.1)",
                }}
              />
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Gotowe!
              </h2>
              <p className="text-slate-700 text-lg leading-relaxed mb-8">
                Ukończyłeś trening akomodacji. Twoje oczy wykonały{" "}
                <span className="font-bold">
                  {maxCycles * 2} zmian ostrości
                </span>{" "}
                w ciągu 2 minut.
              </p>

              <div className="flex justify-center">
                <GradientButton onClick={startTraining}>Powtórz</GradientButton>
              </div>
            </div>
          </div>
        </section>
      )}

      {status !== "start" && <FooterSection />}

      <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }

                .animate-fade-in {
                    animation: fadeIn 600ms ease-out;
                }

                .animate-fade-in-up {
                    animation: fadeInUp 600ms ease-out;
                }

                .animate-shimmer {
                    animation: shimmer 3s infinite;
                }
            `}</style>
    </div>
  );
}
