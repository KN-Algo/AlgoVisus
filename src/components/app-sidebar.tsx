import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar.utils";
import { isRouteVisibleInUi, routes } from "@/lib/routes-config";
import { ExerciseSymbol } from "@/components/exercise-symbol";
import { Info, Settings2, Sparkles, UserRound, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import appLogo from "@/assets/images/Blinky_logo.png";

const exercises = routes.filter(
  (route) => route.prefix === "exercises" && isRouteVisibleInUi(route),
);
const other = routes.filter((r) => r.prefix === "other");
const footer = routes.filter((r) => r.prefix === "footer");

const getRouteIcon = (name: string, prefix: string | null) => {
  const normalized = name.toLowerCase();

  if (prefix === "other") {
    if (normalized.includes("autor")) {
      return UserRound;
    }
    return Info;
  }

  if (prefix === "footer") {
    return Settings2;
  }

  return Sparkles;
};

export function AppSidebar() {
  const { setOpen, setOpenMobile } = useSidebar();

  const handleMenuItemClick = () => {
    setOpen(false);
    setOpenMobile(false);
  };

  return (
    <>
      <style>{`
        [class*="sidebar"] {
          --sidebar: oklch(0.985 0.004 230);
          --sidebar-border: oklch(0.92 0.004 240);
        }
        .app-sidebar-shell {
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(10px);
          outline: none !important;
          border: none !important;
        }
        .app-sidebar-shell * {
          outline: none;
        }
        .app-sidebar-shell > div[data-sidebar="sidebar"] {
          border: none !important;
          box-shadow: none !important;
        }
      `}</style>
      <Sidebar
        collapsible="offcanvas"
        variant="floating"
        className="z-[70] app-sidebar-shell border-none"
      >
        {/* Nagłówek bocznego panelu */}
        <SidebarHeader className="relative overflow-hidden p-4 border-b border-slate-200/80 bg-gradient-to-br from-cyan-100/70 via-sky-50/90 to-teal-100/60">
          <div className="pointer-events-none absolute -top-8 -left-8 h-24 w-24 rounded-full bg-white/50 blur-2xl animate-pulse" />
          <div className="pointer-events-none absolute -bottom-10 right-0 h-28 w-28 rounded-full bg-cyan-200/35 blur-2xl animate-pulse [animation-delay:1400ms]" />

          <Button
            variant="ghost"
            size="icon"
            onClick={handleMenuItemClick}
            className="absolute top-3 right-3 z-20 h-8 w-8 rounded-full text-slate-600 hover:bg-white/60 hover:text-slate-900"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close menu</span>
          </Button>

          <Link
            to="/"
            onClick={handleMenuItemClick}
            className="relative z-10 flex items-center gap-3 pr-12"
          >
            <img
              src={appLogo}
              alt="Blinky logo"
              className="h-12 w-12 rounded-xl border border-white/70 object-cover shadow-sm"
            />
            <div className="min-w-0">
              <p className="truncate text-base font-semibold tracking-wide text-slate-900">
                Blinky
              </p>
            </div>
          </Link>
        </SidebarHeader>

        {/* Główna zawartość bocznego panelu */}
        <SidebarContent className="px-2 py-3 overflow-x-hidden">
          <SidebarGroup className="py-0">
            <span className="px-3 pb-2 text-[11px] font-semibold text-slate-500 tracking-[0.18em] uppercase">
              Ćwiczenia
            </span>
            <SidebarMenu>
              {exercises.map((route) => {
                return (
                  <SidebarMenuItem key={route.path}>
                    <SidebarMenuButton
                      asChild
                      size="lg"
                      className="mx-1 rounded-xl p-0"
                    >
                      <NavLink
                        to={route.path}
                        onClick={handleMenuItemClick}
                        className={({ isActive }) =>
                          `group/item flex h-full w-full items-center gap-3 rounded-xl px-3.5 text-sm transition-all duration-200 ${
                            isActive
                              ? "bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-900 shadow-sm"
                              : "text-black hover:bg-slate-100/90 hover:text-black"
                          }`
                        }
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-slate-200/70 border border-slate-400">
                          <ExerciseSymbol name={route.name} variant="menu" />
                        </span>
                        <span className="truncate font-medium">
                          {route.name}
                        </span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup className="py-1">
            <span className="px-3 pb-2 text-[11px] font-semibold text-slate-500 tracking-[0.18em] uppercase">
              Inne
            </span>
            <SidebarMenu>
              {other.map((route) => {
                const Icon = getRouteIcon(route.name, route.prefix);

                return (
                  <SidebarMenuItem key={route.path}>
                    <SidebarMenuButton
                      asChild
                      size="lg"
                      className="mx-1 rounded-xl p-0"
                    >
                      <NavLink
                        to={route.path}
                        onClick={handleMenuItemClick}
                        className={({ isActive }) =>
                          `group/item flex h-full w-full items-center gap-3 rounded-xl px-3.5 text-sm transition-all duration-200 ${
                            isActive
                              ? "bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-900 shadow-sm"
                              : "text-black hover:bg-slate-100/90 hover:text-black"
                          }`
                        }
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-slate-200/70 border border-slate-400">
                          <Icon className="h-4.5 w-4.5 text-black" />
                        </span>
                        <span className="truncate font-medium">
                          {route.name}
                        </span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        {/* Stopka bocznego panelu */}
        {/* <SidebarFooter className="border-t border-slate-200/80 p-2"> */}
        <SidebarFooter>
          <SidebarMenu>
            {footer.map((_) => {
              // const Icon = getRouteIcon(route.name, route.prefix);

              return (
                <></>
                // <SidebarMenuItem key={route.path}>
                //   <SidebarMenuButton
                //     asChild
                //     size="lg"
                //     className="mx-1 rounded-xl p-0"
                //   >
                //     <NavLink
                //       to={route.path}
                //       onClick={handleMenuItemClick}
                //       className={({ isActive }) =>
                //         `flex h-full w-full items-center gap-3 rounded-xl px-3.5 text-sm transition-all duration-200 ${
                //           isActive
                //             ? "bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-900 shadow-sm"
                //             : "text-black hover:bg-slate-100/90 hover:text-black"
                //         }`
                //       }
                //     >
                //       <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-slate-200/70 border border-slate-400">
                //         <Icon className="h-4.5 w-4.5 text-black" />
                //       </span>
                //       <span className="truncate font-medium">{route.name}</span>
                //     </NavLink>
                //   </SidebarMenuButton>
                // </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
