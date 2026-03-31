import { useEffect, useRef, useState } from "react";
import { TreePine } from "lucide-react";
import {
  useNotifications,
  type AppNotification,
} from "../hooks/useNotifications";
import { useTimeNotification } from "../hooks/useTimeNotification";
import drzewoVideo from "../assets/videos/Drzewo.mp4";
import notifySound from "../assets/sounds/notify.mp3";
import { GradientButton } from "@/components/ui/gradient-button";
import { Button } from "@/components/ui/button";
import { FooterSection } from "./_components/FooterSection.tsx";

const EXERCISE_TRANSITION_MS = 420;

const drzewkoNotification: AppNotification = {
  title: "Ćwiczenie Drzewko zakończone! 🌳",
  options: {
    body: "To powiadomienie wysyła się z ćwiczenia Drzewko, które właśnie wykonujesz.",
  },
};

interface DrzewkoExercisePanelProps {
  permission: NotificationPermission;
  requestPermission: () => void;
  sendNotification: (notification: AppNotification) => void;
  onClose: () => void;
}

function DrzewkoExercisePanel({
  permission,
  requestPermission,
  sendNotification,
  onClose,
}: DrzewkoExercisePanelProps) {
  const [exerciseStarted, setExerciseStarted] = useState(false);
  const [exercisePaused, setExercisePaused] = useState(false);
  const [mediaWarning, setMediaWarning] = useState<string | null>(null);
  const [showEnableSoundButton, setShowEnableSoundButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const timer = useTimeNotification(sendNotification, drzewkoNotification, {
    hour: 0,
    minut: 2,
    second: 0,
  });
  const isTimerFinished = timer.time <= 0;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (exerciseStarted && !exercisePaused && !isTimerFinished) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn(
            "Nie udalo sie odtworzyc wideo w cwiczeniu Drzewko.",
            error,
          );
          setMediaWarning(
            "Wideo nie uruchomilo sie automatycznie. Sprobuj ponownie lub odswiez strone.",
          );
        });
      }
      return;
    }

    video.pause();

    if (!exerciseStarted) {
      video.currentTime = 0;
    }
  }, [exerciseStarted, exercisePaused, isTimerFinished]);

  useEffect(() => {
    if (exerciseStarted && isTimerFinished) {
      const audio = audioRef.current;
      if (!audio) {
        return;
      }

      audio.currentTime = 0;
      audio.play().catch((error) => {
        console.warn("Nie udalo sie odtworzyc dzwieku powiadomienia.", error);
        setMediaWarning(
          'Przegladarka zablokowala dzwiek. Kliknij "Wlacz dzwiek".',
        );
        setShowEnableSoundButton(true);
      });
    }
  }, [exerciseStarted, isTimerFinished]);

  const enableSound = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.currentTime = 0;
    audio
      .play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
        setShowEnableSoundButton(false);
        setMediaWarning(null);
      })
      .catch((error) => {
        console.warn("Nie udało się recznie włączyć dzwieku.", error);
        setMediaWarning(
          "Nie udało się włączyć dźwięku. Sprawdz ustawienia przegladarki.",
        );
      });
  };

  const resetExerciseState = () => {
    timer.reset();
    setExerciseStarted(false);
    setExercisePaused(false);
    setMediaWarning(null);
    setShowEnableSoundButton(false);
  };

  const handleClose = () => {
    resetExerciseState();
    onClose();
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-slate-950/92 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
      <div className="absolute right-5 top-5 text-xl font-mono font-bold tracking-[0.2em] text-gray-300 md:text-2xl">
        {Math.ceil(timer.time / 1000)}s
      </div>

      <div className="px-4 pt-8 text-center md:px-6 md:pt-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300/80">
          Ćwiczenie aktywne
        </p>
        <h2 className="mt-2 text-2xl font-bold md:text-3xl">Drzewko</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300">
          Znajdź za oknem wybrany punkt lub kontur obiektu i spokojnie obrysowuj
          go wzrokiem, pozwalając oczom odpocząć od monitora.
        </p>
      </div>

      <div className="px-4 pb-5 pt-5 md:px-6 md:pb-6">
        {permission !== "granted" ? (
          <div className="mx-auto flex max-w-2xl flex-col items-center rounded-[1.5rem] border border-white/12 bg-white/[0.03] px-6 py-12 text-center">
            <p className="text-lg font-semibold text-white">
              Aby otrzymywać powiadomienia po zakończeniu ćwiczenia, zezwól na
              powiadomienia w przeglądarce.
            </p>
            <p className="mt-3 max-w-xl text-sm text-slate-300">
              Dzięki temu po upływie dwóch minut dostaniesz sygnał, że możesz
              wrócić do pracy lub rozpocząć kolejną przerwę.
            </p>
            <Button className="mt-6" onClick={requestPermission}>
              Zezwól na powiadomienia
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative mx-auto w-full max-w-xs overflow-hidden rounded-[1.4rem] border border-white/12 bg-black shadow-2xl md:max-w-sm">
              <div className="aspect-square w-full">
                <video
                  ref={videoRef}
                  className="h-full w-full object-contain"
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  src={drzewoVideo}
                >
                  Twoja przeglądarka nie wspiera wideo.
                </video>
              </div>
            </div>

            <audio ref={audioRef} src={notifySound} />

            {mediaWarning ? (
              <p className="text-center text-sm text-amber-300">
                {mediaWarning}
              </p>
            ) : null}

            {showEnableSoundButton ? (
              <div className="flex justify-center">
                <Button
                  variant="secondary"
                  className="bg-amber-500 text-white hover:bg-amber-500/90"
                  onClick={enableSound}
                >
                  Włącz dźwięk
                </Button>
              </div>
            ) : null}

            <div className="flex flex-wrap justify-center gap-3">
              {!exerciseStarted ? (
                <Button
                  size="lg"
                  onClick={() => {
                    timer.start();
                    setExerciseStarted(true);
                    setExercisePaused(false);
                  }}
                >
                  Rozpocznij
                </Button>
              ) : (
                <>
                  {!exercisePaused && !isTimerFinished ? (
                    <Button
                      size="lg"
                      variant="secondary"
                      onClick={() => {
                        timer.stop();
                        setExercisePaused(true);
                      }}
                    >
                      Pauza
                    </Button>
                  ) : !isTimerFinished ? (
                    <Button
                      size="lg"
                      onClick={() => {
                        timer.start();
                        setExercisePaused(false);
                      }}
                    >
                      Wznów
                    </Button>
                  ) : null}

                  <Button
                    size="lg"
                    variant="destructive"
                    onClick={resetExerciseState}
                  >
                    Zakończ ćwiczenie
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center border-t border-white/8 px-6 pb-6 pt-2">
        <Button
          variant="link"
          className="text-slate-300 hover:text-white"
          onClick={handleClose}
        >
          Wróć do opisu
        </Button>
      </div>
    </div>
  );
}

function DrzewkoPage() {
  const [shouldRenderExercise, setShouldRenderExercise] = useState(false);
  const [isExerciseVisible, setIsExerciseVisible] = useState(false);
  const exerciseCardRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const { permission, requestPermission, sendNotification } =
    useNotifications();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  useEffect(() => {
    if (!shouldRenderExercise) {
      return;
    }

    requestAnimationFrame(() => {
      setIsExerciseVisible(true);
    });
  }, [shouldRenderExercise]);

  useEffect(() => {
    if (!isExerciseVisible || !exerciseCardRef.current) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const element = exerciseCardRef.current;
      if (!element) {
        return;
      }

      const navbarOffset = 50;
      const extraGap = 18;
      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;

      window.scrollTo({
        top: Math.max(0, absoluteTop - navbarOffset - extraGap),
        behavior: "smooth",
      });
    }, 280);

    return () => window.clearTimeout(timeoutId);
  }, [isExerciseVisible]);

  const handleOpenExercise = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    requestPermission();

    if (shouldRenderExercise) {
      setIsExerciseVisible(true);
      return;
    }

    setShouldRenderExercise(true);
  };

  const handleCloseExercise = () => {
    setIsExerciseVisible(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    closeTimeoutRef.current = window.setTimeout(() => {
      setShouldRenderExercise(false);
      closeTimeoutRef.current = null;
    }, EXERCISE_TRANSITION_MS);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full">
      <section className="relative w-full min-h-screen overflow-hidden animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-50 via-emerald-50 to-amber-50" />
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
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/70 bg-white/80 shadow-[0_14px_30px_rgba(16,185,129,0.12)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_18px_36px_rgba(16,185,129,0.18)] md:h-28 md:w-28">
                <TreePine className="h-11 w-11 text-emerald-600 md:h-14 md:w-14" />
              </div>
            </div>

            <h1
              className="mb-6 text-center text-4xl font-bold leading-tight text-slate-900 animate-fade-in-up md:text-5xl lg:text-6xl"
              style={{
                animationDelay: "200ms",
                animationFillMode: "backwards",
              }}
            >
              Ćwiczenie
              <span className="block bg-gradient-to-r from-emerald-700 via-lime-600 to-amber-600 bg-clip-text text-transparent">
                Drzewko
              </span>
            </h1>

            <p
              className="mx-auto mb-4 max-w-3xl text-center text-lg leading-relaxed text-slate-600 animate-fade-in-up md:text-xl"
              style={{
                animationDelay: "300ms",
                animationFillMode: "backwards",
              }}
            >
              Ćwiczenie "Drzewko" to 2 minutowe zadanie, które polega na
              obrysowaniu wzrokiem dowolnego obiektu, który znajdziesz za oknem.
            </p>
            <p
              className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-slate-600 animate-fade-in-up md:text-xl"
              style={{
                animationDelay: "340ms",
                animationFillMode: "backwards",
              }}
            >
              Taka krótka przerwa pozwala na chwilę oderwać się od ekranu,
              zrelaksować oczy i wyciszyć umysł przed powrotem do pracy.
            </p>

            <div
              className="mx-auto mb-12 max-w-sm animate-fade-in-up"
              style={{
                animationDelay: "380ms",
                animationFillMode: "backwards",
              }}
            >
              <div className="rounded-2xl border border-white/75 bg-white/80 p-5 text-center shadow-[0_14px_30px_rgba(16,185,129,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_18px_36px_rgba(16,185,129,0.12)]">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700/70">
                  Czas trwania
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  2 minuty
                </p>
              </div>
            </div>

            <div
              className="flex justify-center animate-fade-in-up"
              style={{
                animationDelay: "420ms",
                animationFillMode: "backwards",
              }}
            >
              <GradientButton onClick={handleOpenExercise}>
                Rozpocznij ćwiczenie
              </GradientButton>
            </div>
          </div>
        </div>
      </section>

      {shouldRenderExercise && (
        <section className="relative w-full bg-gradient-to-b from-lime-50 via-white to-emerald-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700/70">
                Tryb ćwiczenia
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                Znajdź punkt za oknem i odpocznij od ekranu
              </h2>
            </div>

            <div
              ref={exerciseCardRef}
              className={`transform-gpu transition-all ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isExerciseVisible
                  ? "translate-y-0 scale-100 opacity-100 duration-500"
                  : "translate-y-6 scale-[0.985] opacity-0 duration-400"
              }`}
            >
              <DrzewkoExercisePanel
                permission={permission}
                requestPermission={requestPermission}
                sendNotification={sendNotification}
                onClose={handleCloseExercise}
              />
            </div>
          </div>
        </section>
      )}

      <FooterSection />
    </div>
  );
}

export default DrzewkoPage;
