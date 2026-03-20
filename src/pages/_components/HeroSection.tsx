import { GradientButton } from "@/components/ui/gradient-button";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden animate-fade-in">
      {/* Base Background - More Color Saturation, Less White */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-150 via-cyan-100 to-teal-150" />

      {/* Animated Shimmer/Shine Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 py-16 lg:py-24">
        <div className="max-w-4xl w-full">
          {/* Logo */}
          <div
            className="flex justify-center mb-12 animate-fade-in-up"
            style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-2xl overflow-hidden border-4 border-white/50 backdrop-blur-sm hover:scale-110 transition-transform duration-300">
              <img
                src="/src/assets/images/AlgoVisus_logo.png"
                alt="AlgoVisus Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Tytuł */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-slate-900 mb-6 leading-tight animate-fade-in-up"
            style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
          >
            Dbaj o zdrowie
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              swoich oczu
            </span>
          </h1>

          {/* Opis */}
          <p
            className="text-lg md:text-xl text-slate-600 text-center mb-12 leading-relaxed max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
          >
            AlgoVisus to aplikacja stworzona specjalnie dla programistów i
            pracowników biurowych, którzy dbają o zdrowie swoich oczu.
            Regularnie przypominamy o przerwach i dostarczamy cennych informacji
            o higienie wzroku, bazując na wiedzy optometrycznej.
          </p>

          {/* CTA Button */}
          <div
            className="flex justify-center animate-fade-in-up"
            style={{ animationDelay: "400ms", animationFillMode: "backwards" }}
          >
            <GradientButton>Zacznij teraz</GradientButton>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

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

        .animate-shimmer {
          animation: shimmer 4s infinite;
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
