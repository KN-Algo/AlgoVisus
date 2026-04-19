import { Link } from "react-router-dom";
import { SidebarTrigger } from "./ui/sidebar";
import { ScrollProgressBar } from "./scroll-progress-bar";
import { useSidebar } from "./ui/sidebar.utils";

export function AppNavigationMenu() {
  const { open, isMobile } = useSidebar();
  const shouldElevateText = open && !isMobile;
  const activeBrandClass =
    "text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-cyan-600 to-blue-600 drop-shadow-[0_1px_4px_rgba(2,6,23,0.22)] brightness-110 contrast-105 saturate-110";

  return (
    <>
      {shouldElevateText && (
        <div className="pointer-events-none fixed inset-x-0 top-0 z-[63] flex h-16 items-center justify-center">
          <span className="relative inline-flex items-center justify-center px-2">
            <span
              className={`relative z-10 text-2xl font-bold tracking-tight ${activeBrandClass}`}
            >
              {"Blinky"}
            </span>
          </span>
        </div>
      )}

      <header className="sticky top-0 z-[62] w-full border-b bg-background/60 backdrop-blur-md relative shadow-sm">
        <div className="flex h-16 items-center px-4">
          {/* LEWA STRONA: Znaczek Sidebar */}
          <div className="flex w-1/4 justify-start">
            <SidebarTrigger />
          </div>

          {/* ŚRODEK: Logo/Nazwa */}
          <div className="flex w-2/4 justify-center">
            <Link to={"/"} className="flex w-2/4 justify-center">
              <span
                className={`relative z-10 text-2xl font-bold tracking-tight transition-all duration-300 ${
                  shouldElevateText ? "opacity-0" : "text-slate-900"
                }`}
              >
                {"Blinky"}
              </span>
            </Link>
          </div>

          {/* PRAWA STRONA: Puste miejsce dla symetrii, mozna tam cos dodac */}
          <div className="flex w-1/4 justify-end"></div>
        </div>

        {/* Scroll Progress Bar */}
        <ScrollProgressBar />
      </header>
    </>
  );
}
