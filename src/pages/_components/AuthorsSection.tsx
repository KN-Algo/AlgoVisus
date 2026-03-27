import { authors } from "@/data/authors";
import { AuthorCard } from "@/components/author-card";
import KnAlgoLogo from "@/assets/images/Kn_Algo_logo.svg";
import KnVisusLogo from "@/assets/images/Kn_Visus_logo.webp";

export function AuthorsSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden py-12 md:py-16 lg:py-24">
      {/* Base Background - Gradient similar to HeroSection */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100" />

      {/* Animated Shimmer/Shine Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
      </div>

      {/* Main Content */}
      <div className="relative w-full flex flex-col items-center justify-center px-3 md:px-4">
        <div className="w-full max-w-4xl md:max-w-5xl lg:max-w-6xl">
          {/* Section Title */}
          <div className="text-center mb-8 md:mb-12 lg:mb-16 animate-fade-in-up">
            <h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 md:mb-6 leading-tight"
              style={{
                animationDelay: "100ms",
                animationFillMode: "backwards",
              }}
            >
              Poznaj nasz zespół
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                Twórcy AlgoVisus
              </span>
            </h1>

            <p
              className="text-base md:text-xl lg:text-2xl text-slate-600 text-center max-w-xl md:max-w-2xl mx-auto leading-relaxed animate-fade-in-up px-2"
              style={{
                animationDelay: "200ms",
                animationFillMode: "backwards",
              }}
            >
              Zespół pasjonatów z KN Algo i KN Visus pracujący nad zdrowiem
              Twoich oczu
            </p>

            {/* Logos */}
            <div
              className="flex justify-center gap-4 md:gap-8 mt-8 md:mt-12 animate-fade-in-up flex-wrap items-center"
              style={{
                animationDelay: "300ms",
                animationFillMode: "backwards",
              }}
            >
              <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-lg overflow-hidden shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center bg-white/10">
                <img
                  src={KnAlgoLogo}
                  alt="KN Algo Logo"
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-lg overflow-hidden shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center bg-white/10">
                <img
                  src={KnVisusLogo}
                  alt="KN Visus Logo"
                  className="w-full h-full object-contain p-2"
                />
              </div>
            </div>
          </div>

          {/* Authors Grid */}
          <div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 xl:gap-8"
            style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
          >
            {authors.map((author, index) => (
              <div
                key={author.id}
                className="animate-fade-in-up"
                style={{
                  animationDelay: `${400 + index * 80}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <AuthorCard author={author} />
              </div>
            ))}
          </div>

          {/* Empty state - jeśli brak autorów */}
          {authors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">
                Brak autorów do wyświetlenia
              </p>
            </div>
          )}
        </div>
      </div>

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
            transform: translate(0, 30px);
          }
          to {
            opacity: 1;
            transform: translate(0, 0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 600ms ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 600ms ease-out;
        }
      `}</style>
    </section>
  );
}
