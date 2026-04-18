import { useEffect, useRef, useState } from "react";
import { GradientButton } from "@/components/ui/gradient-button";
import { FooterSection } from "./_components/FooterSection.tsx";

const WORK_DURATION_MS = 20 * 60 * 1000;
const LOOK_AWAY_DURATION_MS = 20 * 1000;
const FULL_CYCLE_MS = WORK_DURATION_MS + LOOK_AWAY_DURATION_MS;
const TIMER_TICK_MS = 250;
const EXERCISE_TRANSITION_MS = 420;
const STORAGE_KEY = "twenty-rule-session";
const STORAGE_VERSION = 3;
const WORK_DURATION_LABEL = "20 minut";
const WORK_DURATION_BUTTON_LABEL = "Rozpocznij odliczanie 20 minut";

type ExercisePhase = "idle" | "work" | "lookAway" | "completed";
type ActiveExercisePhase = Exclude<ExercisePhase, "idle">;
type BrowserNotificationPermission = NotificationPermission | "unsupported";
type PersistedTwentyRuleState = {
  version: number;
  autoRestart: boolean;
  phase: ExercisePhase;
  timeLeftMs: number;
  isRunning: boolean;
  completedCycles: number;
  shouldRenderExercise: boolean;
  deadlineMs: number | null;
};
type RestoredTwentyRuleState = PersistedTwentyRuleState & {
  isExerciseVisible: boolean;
};
type PhaseNotification = {
  title: string;
  body: string;
  tag: string;
};

const phaseStyles: Record<
  ActiveExercisePhase,
  {
    badge: string;
    badgeClassName: string;
    title: string;
    description: string;
    panelClassName: string;
    glowClassName: string;
    progressClassName: string;
  }
> = {
  work: {
    badge: "Etap 1 z 2",
    badgeClassName: "bg-amber-500/15 text-amber-100 ring-1 ring-amber-200/25",
    title: "Pracuj jeszcze przez",
    description:
      "Pracuj normalnie przy ekranie. Gdy licznik dojdzie do zera, przejdziesz do 20 sekund patrzenia w dal.",
    panelClassName:
      "from-amber-500 via-orange-500 to-rose-500 text-white shadow-[0_26px_60px_rgba(245,158,11,0.24)]",
    glowClassName: "bg-white/16",
    progressClassName: "bg-white/90",
  },
  lookAway: {
    badge: "Etap 2 z 2",
    badgeClassName:
      "bg-emerald-500/15 text-emerald-100 ring-1 ring-emerald-200/25",
    title: "Spójrz w dal przez",
    description:
      "Oderwij wzrok od ekranu i skup się na obiekcie oddalonym o około 20 stóp (około 6 metrów). Nie wracaj jeszcze do monitora.",
    panelClassName:
      "from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-[0_26px_60px_rgba(16,185,129,0.24)]",
    glowClassName: "bg-white/14",
    progressClassName: "bg-white/90",
  },
  completed: {
    badge: "Cykl zakończony",
    badgeClassName: "bg-slate-900/12 text-slate-700 ring-1 ring-slate-300/70",
    title: "Możesz wrócić do pracy",
    description:
      "20 sekund minęło. Jeśli chcesz, rozpocznij kolejny cykl ręcznie albo włącz automatyczne uruchamianie następnego cyklu.",
    panelClassName:
      "from-white via-slate-50 to-teal-50 text-slate-900 shadow-[0_26px_60px_rgba(15,23,42,0.12)]",
    glowClassName: "bg-slate-900/5",
    progressClassName: "bg-teal-500",
  },
};

function formatCountdown(timeLeftMs: number) {
  const totalSeconds = Math.ceil(timeLeftMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function getPhaseDuration(phase: ExercisePhase) {
  if (phase === "lookAway") {
    return LOOK_AWAY_DURATION_MS;
  }

  return WORK_DURATION_MS;
}

function isExercisePhase(value: unknown): value is ExercisePhase {
  return (
    value === "idle" ||
    value === "work" ||
    value === "lookAway" ||
    value === "completed"
  );
}

function getInitialNotificationPermission(): BrowserNotificationPermission {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "unsupported";
  }

  return window.Notification.permission;
}

async function requestSystemNotificationPermission(): Promise<BrowserNotificationPermission> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "unsupported";
  }

  return window.Notification.requestPermission();
}

async function sendSystemNotification({ title, body, tag }: PhaseNotification) {
  if (
    typeof window === "undefined" ||
    !("Notification" in window) ||
    window.Notification.permission !== "granted"
  ) {
    return;
  }

  try {
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, {
        body,
        tag,
      });
      return;
    }

    new window.Notification(title, {
      body,
      tag,
    });
  } catch (error) {
    console.error(
      "Nie udało się wysłać powiadomienia dla reguły 20-20-20.",
      error,
    );
  }
}

function getDefaultTwentyRuleState(): RestoredTwentyRuleState {
  return {
    version: STORAGE_VERSION,
    autoRestart: false,
    phase: "idle",
    timeLeftMs: WORK_DURATION_MS,
    isRunning: false,
    completedCycles: 0,
    shouldRenderExercise: false,
    isExerciseVisible: false,
    deadlineMs: null,
  };
}

function resolveFromWorkStart(
  workStartMs: number,
  completedCycles: number,
  now: number,
) {
  const elapsedMs = Math.max(0, now - workStartMs);
  const fullCycles = Math.floor(elapsedMs / FULL_CYCLE_MS);
  const cycleOffsetMs = elapsedMs % FULL_CYCLE_MS;
  const resolvedCompletedCycles = completedCycles + fullCycles;

  if (cycleOffsetMs < WORK_DURATION_MS) {
    const deadlineMs =
      workStartMs + fullCycles * FULL_CYCLE_MS + WORK_DURATION_MS;

    return {
      phase: "work" as const,
      timeLeftMs: Math.max(deadlineMs - now, 0),
      isRunning: true,
      completedCycles: resolvedCompletedCycles,
      deadlineMs,
    };
  }

  const deadlineMs = workStartMs + (fullCycles + 1) * FULL_CYCLE_MS;

  return {
    phase: "lookAway" as const,
    timeLeftMs: Math.max(deadlineMs - now, 0),
    isRunning: true,
    completedCycles: resolvedCompletedCycles,
    deadlineMs,
  };
}

function resolveTimerState(
  snapshot: PersistedTwentyRuleState,
  now = Date.now(),
) {
  if (
    !snapshot.isRunning ||
    snapshot.deadlineMs === null ||
    snapshot.phase === "completed" ||
    snapshot.phase === "idle"
  ) {
    return {
      phase: snapshot.phase,
      timeLeftMs: snapshot.phase === "completed" ? 0 : snapshot.timeLeftMs,
      isRunning: false,
      completedCycles: snapshot.completedCycles,
      deadlineMs: null,
    };
  }

  if (snapshot.phase === "work") {
    if (now < snapshot.deadlineMs) {
      return {
        phase: "work" as const,
        timeLeftMs: snapshot.deadlineMs - now,
        isRunning: true,
        completedCycles: snapshot.completedCycles,
        deadlineMs: snapshot.deadlineMs,
      };
    }

    const lookAwayDeadlineMs = snapshot.deadlineMs + LOOK_AWAY_DURATION_MS;

    if (now < lookAwayDeadlineMs) {
      return {
        phase: "lookAway" as const,
        timeLeftMs: lookAwayDeadlineMs - now,
        isRunning: true,
        completedCycles: snapshot.completedCycles,
        deadlineMs: lookAwayDeadlineMs,
      };
    }

    const completedCycles = snapshot.completedCycles + 1;

    if (!snapshot.autoRestart) {
      return {
        phase: "completed" as const,
        timeLeftMs: 0,
        isRunning: false,
        completedCycles,
        deadlineMs: null,
      };
    }

    return resolveFromWorkStart(lookAwayDeadlineMs, completedCycles, now);
  }

  if (now < snapshot.deadlineMs) {
    return {
      phase: "lookAway" as const,
      timeLeftMs: snapshot.deadlineMs - now,
      isRunning: true,
      completedCycles: snapshot.completedCycles,
      deadlineMs: snapshot.deadlineMs,
    };
  }

  const completedCycles = snapshot.completedCycles + 1;

  if (!snapshot.autoRestart) {
    return {
      phase: "completed" as const,
      timeLeftMs: 0,
      isRunning: false,
      completedCycles,
      deadlineMs: null,
    };
  }

  return resolveFromWorkStart(snapshot.deadlineMs, completedCycles, now);
}

function loadPersistedTwentyRuleState(): RestoredTwentyRuleState {
  const fallbackState = getDefaultTwentyRuleState();

  if (typeof window === "undefined") {
    return fallbackState;
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return fallbackState;
    }

    const parsedValue = JSON.parse(
      storedValue,
    ) as Partial<PersistedTwentyRuleState>;
    const autoRestart =
      typeof parsedValue.autoRestart === "boolean"
        ? parsedValue.autoRestart
        : false;

    if (
      parsedValue.version !== STORAGE_VERSION ||
      !parsedValue.shouldRenderExercise ||
      !isExercisePhase(parsedValue.phase)
    ) {
      return {
        ...fallbackState,
        autoRestart,
      };
    }

    const resolvedTimerState = resolveTimerState({
      version: STORAGE_VERSION,
      autoRestart,
      phase: parsedValue.phase,
      timeLeftMs:
        typeof parsedValue.timeLeftMs === "number" &&
        Number.isFinite(parsedValue.timeLeftMs)
          ? Math.max(parsedValue.timeLeftMs, 0)
          : WORK_DURATION_MS,
      isRunning: parsedValue.isRunning === true,
      completedCycles:
        typeof parsedValue.completedCycles === "number" &&
        Number.isFinite(parsedValue.completedCycles)
          ? Math.max(0, Math.floor(parsedValue.completedCycles))
          : 0,
      shouldRenderExercise: true,
      deadlineMs:
        typeof parsedValue.deadlineMs === "number" &&
        Number.isFinite(parsedValue.deadlineMs)
          ? parsedValue.deadlineMs
          : null,
    });

    return {
      version: STORAGE_VERSION,
      autoRestart,
      shouldRenderExercise: true,
      isExerciseVisible: true,
      ...resolvedTimerState,
    };
  } catch {
    return fallbackState;
  }
}

function ToggleSwitch({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onToggle}
      className={`relative inline-flex h-8 w-16 items-center rounded-full border transition-all duration-300 ${
        enabled
          ? "border-teal-500/40 bg-gradient-to-r from-teal-500 to-cyan-500"
          : "border-slate-300 bg-slate-200"
      }`}
    >
      <span className="sr-only">Automatyczny kolejny cykl</span>
      <span
        className={`mx-1 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
          enabled ? "translate-x-8" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function InfoCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/75 bg-white/80 p-5 text-center shadow-[0_14px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_18px_36px_rgba(15,23,42,0.10)]">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700/70">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {description}
      </p>
    </div>
  );
}

export default function TwentyRulePage() {
  const [initialState] = useState(loadPersistedTwentyRuleState);
  const [autoRestart, setAutoRestart] = useState(initialState.autoRestart);
  const [notificationPermission, setNotificationPermission] =
    useState<BrowserNotificationPermission>(getInitialNotificationPermission);
  const [phase, setPhase] = useState<ExercisePhase>(initialState.phase);
  const [timeLeftMs, setTimeLeftMs] = useState(initialState.timeLeftMs);
  const [isRunning, setIsRunning] = useState(initialState.isRunning);
  const [completedCycles, setCompletedCycles] = useState(
    initialState.completedCycles,
  );
  const [shouldRenderExercise, setShouldRenderExercise] = useState(
    initialState.shouldRenderExercise,
  );
  const [isExerciseVisible, setIsExerciseVisible] = useState(
    initialState.isExerciseVisible,
  );
  const [deadlineMs, setDeadlineMs] = useState<number | null>(
    initialState.deadlineMs,
  );

  const exerciseCardRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const timeLeftRef = useRef(initialState.timeLeftMs);
  const previousPhaseRef = useRef(initialState.phase);
  const previousCompletedCyclesRef = useRef(initialState.completedCycles);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  useEffect(() => {
    timeLeftRef.current = timeLeftMs;
  }, [timeLeftMs]);

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return;
    }

    setNotificationPermission(window.Notification.permission);
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

  useEffect(() => {
    if (!isRunning || deadlineMs === null) {
      return;
    }

    const syncTimerState = () => {
      const resolvedTimerState = resolveTimerState({
        version: STORAGE_VERSION,
        autoRestart,
        phase,
        timeLeftMs: 0,
        isRunning: true,
        completedCycles,
        shouldRenderExercise,
        deadlineMs,
      });

      setPhase(resolvedTimerState.phase);
      setTimeLeftMs(resolvedTimerState.timeLeftMs);
      setIsRunning(resolvedTimerState.isRunning);
      setCompletedCycles(resolvedTimerState.completedCycles);
      setDeadlineMs(resolvedTimerState.deadlineMs);
    };

    syncTimerState();

    const intervalId = window.setInterval(syncTimerState, TIMER_TICK_MS);
    const handleVisibilitySync = () => {
      syncTimerState();
    };

    window.addEventListener("focus", handleVisibilitySync);
    document.addEventListener("visibilitychange", handleVisibilitySync);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("focus", handleVisibilitySync);
      document.removeEventListener("visibilitychange", handleVisibilitySync);
    };
  }, [
    autoRestart,
    completedCycles,
    deadlineMs,
    isRunning,
    phase,
    shouldRenderExercise,
  ]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const shouldPersistSession = shouldRenderExercise || phase !== "idle";

    if (!shouldPersistSession) {
      if (autoRestart) {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ autoRestart }),
        );
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      return;
    }

    const persistedState: PersistedTwentyRuleState = {
      version: STORAGE_VERSION,
      autoRestart,
      phase,
      timeLeftMs:
        isRunning && deadlineMs !== null
          ? Math.max(deadlineMs - Date.now(), 0)
          : timeLeftRef.current,
      isRunning,
      completedCycles,
      shouldRenderExercise,
      deadlineMs,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedState));
  }, [
    autoRestart,
    completedCycles,
    deadlineMs,
    isRunning,
    phase,
    shouldRenderExercise,
  ]);

  useEffect(() => {
    const previousPhase = previousPhaseRef.current;
    const previousCompletedCycles = previousCompletedCyclesRef.current;

    if (notificationPermission !== "granted") {
      previousPhaseRef.current = phase;
      previousCompletedCyclesRef.current = completedCycles;
      return;
    }

    if (phase === "lookAway" && previousPhase !== "lookAway") {
      void sendSystemNotification({
        title: "Reguła 20-20-20",
        body: "Minęło 20 minut. Spójrz przez 20 sekund na punkt oddalony o około 20 stóp (6 metrów).",
        tag: "twenty-rule-look-away",
      });
    } else if (completedCycles > previousCompletedCycles) {
      void sendSystemNotification({
        title: "Reguła 20-20-20",
        body: autoRestart
          ? "20 sekund minęło. Możesz wrócić do pracy, a kolejny cykl został już uruchomiony."
          : "20 sekund minęło. Możesz wrócić do pracy albo ręcznie rozpocząć kolejny cykl.",
        tag: "twenty-rule-complete",
      });
    }

    previousPhaseRef.current = phase;
    previousCompletedCyclesRef.current = completedCycles;
  }, [autoRestart, completedCycles, notificationPermission, phase]);

  const openExerciseSection = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    if (shouldRenderExercise) {
      setIsExerciseVisible(true);
      return;
    }

    setShouldRenderExercise(true);
  };

  const startWorkPhase = (resetCompletedCycles: boolean) => {
    if (resetCompletedCycles) {
      setCompletedCycles(0);
    }

    setPhase("work");
    setTimeLeftMs(WORK_DURATION_MS);
    setDeadlineMs(Date.now() + WORK_DURATION_MS);
    setIsRunning(true);
  };

  const handleStartFreshSession = () => {
    if (notificationPermission === "default") {
      void requestSystemNotificationPermission().then((permission) => {
        setNotificationPermission(permission);
      });
    }

    openExerciseSection();
    startWorkPhase(true);
  };

  const handlePauseToggle = () => {
    if (phase === "completed" || phase === "idle") {
      return;
    }

    if (isRunning) {
      const resolvedTimerState = resolveTimerState({
        version: STORAGE_VERSION,
        autoRestart,
        phase,
        timeLeftMs,
        isRunning,
        completedCycles,
        shouldRenderExercise,
        deadlineMs,
      });

      if (!resolvedTimerState.isRunning) {
        setPhase(resolvedTimerState.phase);
        setTimeLeftMs(resolvedTimerState.timeLeftMs);
        setIsRunning(false);
        setCompletedCycles(resolvedTimerState.completedCycles);
        setDeadlineMs(null);
        return;
      }

      const remainingTime =
        resolvedTimerState.deadlineMs === null
          ? timeLeftMs
          : Math.max(resolvedTimerState.deadlineMs - Date.now(), 0);

      setDeadlineMs(null);
      setTimeLeftMs(remainingTime);
      setIsRunning(false);
      return;
    }

    setDeadlineMs(Date.now() + timeLeftMs);
    setIsRunning(true);
  };

  const handleCloseExercise = () => {
    setDeadlineMs(null);
    setIsRunning(false);
    setIsExerciseVisible(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    closeTimeoutRef.current = window.setTimeout(() => {
      setShouldRenderExercise(false);
      setPhase("idle");
      setTimeLeftMs(WORK_DURATION_MS);
      setCompletedCycles(0);
      closeTimeoutRef.current = null;
    }, EXERCISE_TRANSITION_MS);
  };

  const activePhase: ActiveExercisePhase = phase === "idle" ? "work" : phase;
  const activePhaseStyles = phaseStyles[activePhase];
  const isCompletedPhase = phase === "completed";
  const currentPhaseDuration = getPhaseDuration(phase);
  const progressPercentage =
    phase === "completed"
      ? 100
      : Math.min(
          100,
          Math.max(
            0,
            ((currentPhaseDuration - timeLeftMs) / currentPhaseDuration) * 100,
          ),
        );
  const currentCycle = completedCycles + (phase === "completed" ? 0 : 1);
  const completedCyclesLabel =
    completedCycles === 1
      ? "1 zakończony cykl"
      : `${completedCycles} zakończone cykle`;
  const infoPillClassName = isCompletedPhase
    ? "rounded-full bg-white/85 px-4 py-1.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-300/70"
    : "rounded-full bg-white/16 px-4 py-1.5 text-sm font-semibold text-white ring-1 ring-white/20";
  const stepLabelClassName = isCompletedPhase
    ? "text-slate-500"
    : "text-white/75";
  const descriptionClassName = isCompletedPhase
    ? "text-slate-600"
    : "text-white/80";
  const shouldShowDescriptionBelowCounter = phase === "work";
  const counterPanelClassName = isCompletedPhase
    ? "rounded-[2rem] bg-white/85 px-8 py-6 text-center shadow-[0_18px_40px_rgba(15,23,42,0.08)] ring-1 ring-slate-200 backdrop-blur-sm md:px-12"
    : "rounded-[2rem] bg-white/12 px-8 py-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-white/14 backdrop-blur-sm md:px-12";
  const counterLabelClassName = isCompletedPhase
    ? "text-slate-500"
    : "text-white/65";

  return (
    <div className="w-full">
      <section className="relative w-full min-h-screen overflow-hidden animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-teal-50" />
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
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-white/75 bg-white/85 shadow-[0_14px_30px_rgba(20,184,166,0.12)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_18px_36px_rgba(20,184,166,0.18)] md:h-28 md:w-28">
                <span className="text-3xl font-bold text-slate-900 md:text-4xl">
                  20
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700/70">
                  20|20
                </span>
              </div>
            </div>

            <h1
              className="mb-6 text-center text-4xl font-bold leading-tight text-slate-900 animate-fade-in-up md:text-5xl lg:text-6xl"
              style={{
                animationDelay: "200ms",
                animationFillMode: "backwards",
              }}
            >
              Reguła
              <span className="block bg-gradient-to-r from-amber-600 via-orange-500 to-teal-600 bg-clip-text text-transparent">
                20-20-20
              </span>
            </h1>

            <p
              className="mx-auto mb-4 max-w-3xl text-center text-lg leading-relaxed text-slate-600 animate-fade-in-up md:text-xl"
              style={{
                animationDelay: "300ms",
                animationFillMode: "backwards",
              }}
            >
              To prosta zasada wspierająca oczy podczas pracy przy monitorze. Co
              20 minut warto oderwać wzrok od ekranu i spojrzeć na punkt
              oddalony o około 20 stóp, aby rozluźnić mięśnie odpowiedzialne za
              ustawianie ostrości.
            </p>
            <p
              className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-slate-600 animate-fade-in-up md:text-xl"
              style={{
                animationDelay: "340ms",
                animationFillMode: "backwards",
              }}
            >
              W klasycznej wersji patrzysz przez 20 sekund na obiekt oddalony o
              około 20 stóp (około 6 metrów). Ta podstrona poprowadzi Cię przez
              cały cykl krok po kroku.
            </p>

            <div
              className="mb-12 grid gap-5 md:grid-cols-3 animate-fade-in-up"
              style={{
                animationDelay: "380ms",
                animationFillMode: "backwards",
              }}
            >
              <InfoCard
                label="Praca"
                value={WORK_DURATION_LABEL}
                description="Przez ten czas pracujesz jak zwykle, a po zakończeniu licznika przechodzisz do krótkiego spojrzenia w dal."
              />
              <InfoCard
                label="Patrzenie w dal"
                value="20 sekund"
                description="Po zakończeniu odliczania kierujesz wzrok poza ekran i pozwalasz oczom odpocząć od bliskiego skupienia."
              />
              <InfoCard
                label="Odległość"
                value="20 stóp"
                description="To około 6 metrów. Najlepiej wybierz punkt za oknem albo daleki element pomieszczenia, którego nie musisz specjalnie wyszukiwać."
              />
            </div>

            <div
              className="mx-auto max-w-3xl animate-fade-in-up"
              style={{
                animationDelay: "430ms",
                animationFillMode: "backwards",
              }}
            >
              <div className="rounded-[2rem] border border-white/75 bg-white/82 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700/70">
                      Ustawienia cyklu
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                      Wybierz sposób działania ćwiczenia
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
                      Suwak decyduje, czy po zakończeniu 20 sekund patrzenia w
                      dal od razu rozpocznie się kolejny cykl 20 minut pracy.
                    </p>
                  </div>

                  <div className="min-h-[152px] w-full rounded-2xl border border-slate-200 bg-slate-50/90 p-4 md:w-[320px]">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          Auto-start kolejnego cyklu
                        </p>
                        <p className="text-xs text-slate-500">
                          Domyślnie wyłączony
                        </p>
                      </div>

                      <ToggleSwitch
                        enabled={autoRestart}
                        onToggle={() => setAutoRestart((current) => !current)}
                      />
                    </div>
                    <p className="mt-3 min-h-[60px] text-sm leading-relaxed text-slate-600">
                      {autoRestart
                        ? "Po zakończeniu patrzenia w dal aplikacja sama uruchomi następne 20 minut."
                        : "Po jednym cyklu zatrzymasz się na komunikacie i sam zdecydujesz, kiedy ruszyć dalej."}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-4 text-center">
                  <GradientButton onClick={handleStartFreshSession}>
                    {WORK_DURATION_BUTTON_LABEL}
                  </GradientButton>
                  <p className="max-w-2xl text-sm leading-relaxed text-slate-500">
                    Po starcie poniżej pojawi się aktywny licznik. Gdy nadejdzie
                    moment przerwy, widok przełączy się automatycznie na
                    instrukcję patrzenia w dal, a przeglądarka może poprosić o
                    zgodę na powiadomienia.
                  </p>
                  <p className="min-h-[20px] text-sm leading-relaxed text-slate-500">
                    {notificationPermission === "granted"
                      ? "Powiadomienia dla tego ćwiczenia są włączone."
                      : notificationPermission === "denied"
                        ? "Powiadomienia są zablokowane w przeglądarce, więc przypomnienia pojawią się tylko na stronie."
                        : notificationPermission === "unsupported"
                          ? "Ta przeglądarka nie obsługuje powiadomień systemowych dla tego ćwiczenia."
                          : "Powiadomienia uruchomią się po zaakceptowaniu zgody w przeglądarce."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {shouldRenderExercise && (
        <section className="relative w-full bg-gradient-to-b from-amber-50/70 via-white to-teal-50/50 py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700/70">
                Tryb ćwiczenia
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                Licznik prowadzi Cię przez kolejny krok reguły 20-20-20
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
              <div
                className={`relative overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br p-6 md:p-8 ${activePhaseStyles.panelClassName}`}
              >
                <div
                  className={`absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl ${activePhaseStyles.glowClassName}`}
                />
                <div
                  className={`absolute -bottom-14 -left-10 h-44 w-44 rounded-full blur-3xl ${activePhaseStyles.glowClassName}`}
                />

                <div className="relative">
                  <div className="mb-6 flex flex-wrap items-center justify-center gap-3 text-center">
                    <span
                      className={`rounded-full px-4 py-1.5 text-sm font-semibold ${activePhaseStyles.badgeClassName}`}
                    >
                      {activePhaseStyles.badge}
                    </span>
                    <span className={infoPillClassName}>
                      Cykl {currentCycle}
                    </span>
                    <span className={infoPillClassName}>
                      {autoRestart
                        ? "Auto-start: włączony"
                        : "Auto-start: wyłączony"}
                    </span>
                    {completedCycles > 0 && (
                      <span className={infoPillClassName}>
                        {completedCyclesLabel}
                      </span>
                    )}
                  </div>

                  <div className="mx-auto max-w-3xl text-center">
                    <p
                      className={`text-sm font-semibold uppercase tracking-[0.24em] ${stepLabelClassName}`}
                    >
                      {phase === "completed"
                        ? "Następny krok"
                        : phase === "lookAway"
                          ? "Oderwij wzrok od monitora"
                          : "Odliczanie do przerwy"}
                    </p>
                    <h3 className="mt-4 text-3xl font-bold md:text-4xl">
                      {activePhaseStyles.title}
                    </h3>
                    {!shouldShowDescriptionBelowCounter && (
                      <p
                        className={`mx-auto mt-4 max-w-2xl text-sm leading-relaxed md:text-base ${descriptionClassName}`}
                      >
                        {activePhaseStyles.description}
                      </p>
                    )}
                  </div>

                  <div className="my-8 flex flex-col items-center justify-center">
                    <div className={counterPanelClassName}>
                      <p
                        className={`text-xs font-semibold uppercase tracking-[0.28em] ${counterLabelClassName}`}
                      >
                        {phase === "completed" ? "Status" : "Pozostało"}
                      </p>
                      <p className="mt-3 text-5xl font-bold tabular-nums md:text-7xl">
                        {phase === "completed"
                          ? "20/20/20"
                          : formatCountdown(timeLeftMs)}
                      </p>
                    </div>
                    {shouldShowDescriptionBelowCounter && (
                      <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-white/80 md:text-base">
                        {activePhaseStyles.description}
                      </p>
                    )}
                  </div>

                  {phase !== "completed" && (
                    <div className="mx-auto mb-8 max-w-2xl">
                      <div className="mb-2 flex items-center justify-between text-sm text-white/80">
                        <span>
                          {phase === "work"
                            ? "Do spojrzenia w dal"
                            : "Do powrotu do pracy"}
                        </span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/16">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${activePhaseStyles.progressClassName}`}
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap justify-center gap-4">
                    {phase === "completed" ? (
                      <GradientButton
                        onClick={() => {
                          openExerciseSection();
                          startWorkPhase(false);
                        }}
                        className="min-w-[240px]"
                      >
                        Rozpocznij kolejny cykl
                      </GradientButton>
                    ) : (
                      <button
                        type="button"
                        onClick={handlePauseToggle}
                        className="min-w-[180px] rounded-xl border border-white/25 bg-white/12 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white/18"
                      >
                        {isRunning ? "Pauza" : "Wznów"}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleCloseExercise}
                      className={`min-w-[180px] rounded-xl px-6 py-3 font-semibold transition-all duration-300 ${
                        phase === "completed"
                          ? "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
                          : "border border-white/25 bg-transparent text-white hover:bg-white/10"
                      }`}
                    >
                      Zakończ ćwiczenie
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <FooterSection />
    </div>
  );
}
