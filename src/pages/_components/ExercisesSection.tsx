import { Link } from "react-router-dom";
import { routes } from "@/lib/routes-config";
import { GradientButton } from "@/components/ui/gradient-button";

const exerciseIcons: { [key: string]: string } = {
  ósemka: "👁️",
  drzewko: "🌳",
  oddech: "🌬️",
  fargaze: "🌠",
  accommodation: "📏",
  rest: "⏱️",
};

const exerciseDescriptions: { [key: string]: string } = {
  ósemka:
    "Śledź wzrokiem punkt poruszający się po torze ósemki, aby rozluźnić oczy i poprawić płynność ruchu.",
  drzewko:
    "Oderwij wzrok od ekranu i obrysowuj wybrany obiekt za oknem, aby rozluźnić oczy.",
  oddech:
    "Uspokój rytm pracy krótkim ćwiczeniem oddechowym prowadzonym krok po kroku.",
};

export function ExercisesSection() {
  const exercises = routes.filter((r) => r.prefix === "exercises");

  return (
    <section
      id="exercises"
      className="w-full bg-gradient-to-b from-white to-blue-50 py-20 px-4 animate-fade-in"
    >
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

        .animate-fade-in {
          animation: fadeIn 600ms ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 600ms ease-out;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          className="mb-16 text-center animate-fade-in-up"
          style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Odkryj ćwiczenie dla zdrowszych oczu
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Każde ćwiczenie jest specjalnie dobrane aby ulżyć zmęczeniu i
            wzmocnić Twój wzrok
          </p>
        </div>

        {/* Exercises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise, index) => (
            <Link
              key={exercise.path}
              to={exercise.path}
              className="group animate-fade-in-up"
              style={{
                animationDelay: `${200 + index * 100}ms`,
                animationFillMode: "backwards",
              }}
            >
              <div className="h-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border border-slate-100 hover:border-teal-300">
                {/* Card Content */}
                <div className="p-8 flex flex-col items-center text-center h-full">
                  {/* Icon */}
                  <div className="text-5xl mb-4">
                    {exerciseIcons[exercise.name.toLowerCase()] || "💪"}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                    {exercise.name}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm md:text-base mb-6 flex-grow">
                    {exerciseDescriptions[exercise.name.toLowerCase()] ||
                      "Odkryj tego ćwiczenia i udoskonalaj swoją technikę"}
                  </p>

                  {/* CTA Button */}
                  <GradientButton>Zacznij ćwiczenie</GradientButton>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {exercises.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-slate-600">
              Ćwiczenia będą wkrótce dostępne 🎉
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
