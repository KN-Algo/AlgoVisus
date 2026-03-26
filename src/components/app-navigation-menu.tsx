import { Link } from "react-router-dom";
import { SidebarTrigger } from "./ui/sidebar";
import { ScrollProgressBar } from "./scroll-progress-bar";
import { useSidebar } from "./ui/sidebar.utils";

export function AppNavigationMenu() {
  const { open, openMobile } = useSidebar();
  const isSidebarOpen = open || openMobile;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-md relative shadow-sm">
      <div className="flex h-16 items-center px-4">
        {/* LEWA STRONA: Znaczek Sidebar */}
        <div className="flex w-1/4 justify-start">
          <SidebarTrigger />
        </div>

        {/* ŚRODEK: Logo/Nazwa */}
        <div className="flex w-2/4 justify-center">
          <Link to={"/"} className="flex w-2/4 justify-center">
            <span className="relative inline-flex items-center justify-center px-2">
              <span
                className={`pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 ${
                  isSidebarOpen
                    ? "opacity-100 shadow-[0_0_22px_8px_rgba(125,211,252,0.45)]"
                    : "opacity-0"
                }`}
              />
              <span
                className={`relative z-10 text-2xl font-bold tracking-tight transition-all duration-300 ${
                  isSidebarOpen
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-100 to-teal-200"
                    : "text-slate-900"
                }`}
              >
                {"AlgoVisus"}
              </span>
            </span>
          </Link>
        </div>

        {/* PRAWA STRONA: Puste miejsce dla symetrii, mozna tam cos dodac */}
        <div className="flex w-1/4 justify-end"></div>
      </div>

      {/* Scroll Progress Bar */}
      <ScrollProgressBar />
    </header>
  );
}
