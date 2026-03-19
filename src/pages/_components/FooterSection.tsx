import { Github, Mail, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {/* About Section */}
          <div className="flex flex-col">
            <h3 className="text-lg md:text-xl font-bold mb-4 text-white">
              AlgoVisus
            </h3>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              Aplikacja do ćwiczenia zdrowia oczu poprzez interaktywne ćwiczenia
              i algorytmy wspomagające wzrok.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-lg md:text-xl font-bold mb-4 text-white">
              Menu
            </h3>
            <nav className="space-y-2 flex flex-col">
              <Link
                to="/"
                className="text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-200"
              >
                Strona główna
              </Link>
              <a
                href="#exercises"
                className="text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-200"
              >
                Ćwiczenia
              </a>
              <a
                href="/o-autorach"
                className="text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-200"
              >
                O autorach
              </a>
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col">
            <h3 className="text-lg md:text-xl font-bold mb-4 text-white">
              Kontakt
            </h3>
            <div className="flex flex-col space-y-3">
              <a
                href="mailto:info@algovisus.pl"
                className="flex items-center gap-2 text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
                <span>info@algovisus.pl</span>
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
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs md:text-sm text-gray-500 text-center md:text-left">
            © {currentYear} AlgoVisus. Wszystkie prawa zastrzeżone.
          </p>
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
            <span>Stworzony z</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>przez KN-Algo</span>
          </div>
          <a
            href="/polityka-prywatnosci"
            className="text-xs md:text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200"
          >
            Polityka prywatności
          </a>
        </div>
      </div>
    </footer>
  );
}
