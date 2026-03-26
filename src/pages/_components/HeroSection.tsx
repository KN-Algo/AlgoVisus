import { GradientButton } from "@/components/ui/gradient-button";
import { useSidebar } from "@/components/ui/sidebar.utils";

export function HeroSection() {
  const { open, isMobile } = useSidebar();
  const shouldElevateLogo = open && !isMobile;

  const handleStartNowClick = () => {
    const exercisesSection = document.getElementById("exercises");
    if (!exercisesSection) return;

    // Account for sticky navbar height so section heading stays visible.
    const navbarOffset = 80;
    const sectionTop =
      exercisesSection.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: Math.max(0, sectionTop - navbarOffset),
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden animate-fade-in">
      {/* Base Background - More Color Saturation, Less White */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-200" />

      {/* Animated Shimmer/Shine Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
      </div>

      {/* Main Content */}
      <div className="relative w-full min-h-screen flex items-center justify-center px-4 py-16 lg:py-24">
        <div className="max-w-4xl w-full">
          {/* Logo */}
          <div
            className={`flex justify-center mb-12 animate-fade-in-up relative ${
              shouldElevateLogo ? "z-[61]" : "z-10"
            }`}
            style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
          >
            <div
              className={`w-24 h-24 md:w-32 md:h-32 rounded-full shadow-2xl overflow-hidden border-4 backdrop-blur-sm hover:scale-110 transition-all duration-300 ${
                shouldElevateLogo
                  ? "border-white/85 shadow-[0_0_0_6px_rgba(255,255,255,0.22),0_0_28px_rgba(125,211,252,0.35)]"
                  : "border-white/50"
              }`}
            >
              <img
                src="/src/assets/images/AlgoVisus_logo.png"
                alt="AlgoVisus Logo"
                className={`w-full h-full object-cover transition-all duration-300 ${
                  shouldElevateLogo
                    ? "brightness-110 contrast-105 saturate-110"
                    : "brightness-100"
                }`}
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
            <GradientButton onClick={handleStartNowClick}>
              Zacznij teraz
            </GradientButton>
          </div>
        </div>
      </div>
    </section>
  );
}
