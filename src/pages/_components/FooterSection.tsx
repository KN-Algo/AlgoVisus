import { Github, Mail, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function FooterSection() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  const scrollToFooterTarget = (targetId: "top" | "exercises") => {
    if (targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const targetTop =
      targetElement.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: Math.max(0, targetTop - 80),
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-100 animate-fade-in">
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

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {/* About Section */}
          <div
            className="flex flex-col animate-fade-in-up"
            style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
          >
            <h3 className="text-lg md:text-xl font-bold mb-4 text-white">
              Blinky
            </h3>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              Aplikacja wspierająca zdrowie oczu poprzez interaktywne ćwiczenia
              oraz algorytmy wspomagające funkcje wzrokowe.
            </p>
          </div>

          {/* Quick Links */}
          <div
            className="flex flex-col animate-fade-in-up"
            style={{ animationDelay: "150ms", animationFillMode: "backwards" }}
          >
            <h3 className="text-lg md:text-xl font-bold mb-4 text-white">
              Menu
            </h3>
            <nav className="space-y-2 flex flex-col">
              <Link
                to="/#top"
                onClick={(event) => {
                  if (location.pathname === "/" && location.hash === "#top") {
                    event.preventDefault();
                    scrollToFooterTarget("top");
                  }
                }}
                className="text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-200"
              >
                Strona główna
              </Link>
              <Link
                to="/#exercises"
                onClick={(event) => {
                  if (
                    location.pathname === "/" &&
                    location.hash === "#exercises"
                  ) {
                    event.preventDefault();
                    scrollToFooterTarget("exercises");
                  }
                }}
                className="text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-200"
              >
                Ćwiczenia
              </Link>
              <Link
                to="/autorzy"
                className="text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-200"
              >
                O autorach
              </Link>
            </nav>
          </div>

          {/* Contact & Social */}
          <div
            className="flex flex-col animate-fade-in-up"
            style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
          >
            <h3 className="text-lg md:text-xl font-bold mb-4 text-white">
              Kontakt
            </h3>
            <div className="flex flex-col space-y-3">
              <a
                href="mailto:kontakt.visus@gmail.com"
                className="flex items-center gap-2 text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
                <span>kontakt.visus@gmail.com</span>
              </a>
              <a
                href="mailto:algo.pwr@gmail.com"
                className="flex items-center gap-2 text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
                <span>algo.pwr@gmail.com</span>
              </a>
              <a
                href="https://github.com/KN-Algo/AlgoVisus"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Github className="w-4 h-4 md:w-5 md:h-5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8 md:pt-12" />

        {/* Bottom Section */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "250ms", animationFillMode: "backwards" }}
        >
          <p className="text-xs md:text-sm text-gray-500 text-center md:text-left">
            © {currentYear} Blinky. Wszystkie prawa zastrzeżone.
          </p>
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
            <span>Stworzony z</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 ml-1" />
            <span>przez KN Algo i KN Visus</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
