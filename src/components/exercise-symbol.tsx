import { Eye, TreePine, Wind } from "lucide-react";

type ExerciseSymbolVariant = "card" | "menu";

interface ExerciseSymbolProps {
  name: string;
  variant?: ExerciseSymbolVariant;
}

function getNormalizedExerciseName(name: string) {
  return name.toLowerCase();
}

function isTwentyRule(name: string) {
  return name === "20-rule";
}

function isFigureEight(name: string) {
  return name.includes("ósem") || name.includes("osem");
}

function isTreeExercise(name: string) {
  return name.includes("drzew");
}

function isBreathExercise(name: string) {
  return name.includes("oddech");
}

function isAccommodationExercise(name: string) {
  return name.includes("akomod") || name.includes("accommodation");
}

export function ExerciseSymbol({
  name,
  variant = "card",
}: ExerciseSymbolProps) {
  const normalizedName = getNormalizedExerciseName(name);

  if (variant === "menu") {
    if (isTwentyRule(normalizedName)) {
      return (
        <span className="flex flex-col items-center justify-center leading-none text-slate-900">
          <span className="text-[11px] font-bold">20</span>
          <span className="text-[6px] font-semibold uppercase tracking-[0.16em] text-slate-700">
            20|20
          </span>
        </span>
      );
    }

    if (isFigureEight(normalizedName)) {
      return <span className="text-base font-light text-slate-900">∞</span>;
    }

    if (isTreeExercise(normalizedName)) {
      return <TreePine className="h-4 w-4 text-slate-900" />;
    }

    if (isBreathExercise(normalizedName)) {
      return <Wind className="h-4 w-4 text-slate-900" />;
    }

    if (isAccommodationExercise(normalizedName)) {
      return <Eye className="h-4 w-4 text-slate-900" />;
    }

    return <Eye className="h-4 w-4 text-slate-900" />;
  }

  if (isTwentyRule(normalizedName)) {
    return (
      <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 border-white/75 bg-white/90 shadow-[0_14px_30px_rgba(20,184,166,0.12)] backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.03] group-hover:shadow-[0_18px_36px_rgba(20,184,166,0.18)] md:h-24 md:w-24">
        <span className="text-2xl font-bold text-slate-900 md:text-3xl">
          20
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-teal-700/70 md:text-xs">
          20|20
        </span>
      </div>
    );
  }

  if (isFigureEight(normalizedName)) {
    return (
      <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/75 bg-white/90 text-5xl font-light text-cyan-500 shadow-[0_14px_30px_rgba(14,165,233,0.10)] backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.03] group-hover:shadow-[0_18px_36px_rgba(14,165,233,0.16)] md:h-24 md:w-24 md:text-6xl">
        ∞
      </div>
    );
  }

  if (isTreeExercise(normalizedName)) {
    return (
      <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/75 bg-white/90 shadow-[0_14px_30px_rgba(16,185,129,0.12)] backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.03] group-hover:shadow-[0_18px_36px_rgba(16,185,129,0.18)] md:h-24 md:w-24">
        <TreePine className="h-9 w-9 text-emerald-600 md:h-11 md:w-11" />
      </div>
    );
  }

  if (isBreathExercise(normalizedName)) {
    return (
      <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/75 bg-white/90 shadow-[0_14px_30px_rgba(79,70,229,0.12)] backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.03] group-hover:shadow-[0_18px_36px_rgba(79,70,229,0.18)] md:h-24 md:w-24">
        <Wind className="h-9 w-9 text-indigo-600 md:h-11 md:w-11" />
      </div>
    );
  }

  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/75 bg-white/90 shadow-[0_14px_30px_rgba(59,130,246,0.12)] backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.03] group-hover:shadow-[0_18px_36px_rgba(59,130,246,0.18)] md:h-24 md:w-24">
      <Eye className="h-9 w-9 text-blue-600 md:h-11 md:w-11" />
    </div>
  );
}
