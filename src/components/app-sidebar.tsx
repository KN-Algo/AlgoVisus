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
import { routes } from "@/lib/routes-config";
import { SeparatorVertical, Settings, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const exercises = routes.filter((r) => r.prefix === "exercises");
const other = routes.filter((r) => r.prefix === "other");
const footer = routes.filter((r) => r.prefix === "footer");

export function AppSidebar() {
  const { setOpen, setOpenMobile } = useSidebar();

  const handleMenuItemClick = () => {
    setOpen(false);
    setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="offcanvas" variant="floating" className="z-50">
      {/* Nagłówek bocznego panelu*/}
      <SidebarHeader className="py-6 flex items-center justify-center relative">
        <Link
          to={"/"}
          onClick={handleMenuItemClick}
          className="flex justify-center"
        >
          <span className="text-2xl font-bold tracking-tight">{"Logo"}</span>
        </Link>
        {/* Close button w rogu */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleMenuItemClick}
          className="absolute top-1 right-4 h-8 w-8"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close menu</span>
        </Button>
      </SidebarHeader>

      {/* Główna zawartość bocznego panelu  */}
      <SidebarContent>
        {/* Grupa menu z ćwiczeniami */}
        <SidebarGroup>
          <span className="text-sm font-semibold text-slate-500 tracking-wide">
            Ćwiczenia
          </span>
          <SidebarMenu>
            {exercises.map((route) => (
              <SidebarMenuItem key={route.path}>
                <SidebarMenuButton
                  asChild
                  className="group transition-all duration-200 hover:text-blue-600"
                >
                  <Link
                    to={route.path}
                    onClick={handleMenuItemClick}
                    className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-black rounded-md transition-colors duration-200 font-medium"
                  >
                    <SeparatorVertical className="w-6 h-6 -ml-2 shrink-0" />
                    <span className="text-sm font-medium">{route.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          {/* Grupa menu z innymi stronami */}
          <span className="text-sm font-semibold text-slate-500 tracking-wide">
            Inne
          </span>
          <SidebarMenu>
            {other.map((route) => (
              <SidebarMenuItem key={route.path}>
                <SidebarMenuButton
                  asChild
                  className="group transition-all duration-200 hover:text-blue-600"
                >
                  <Link
                    to={route.path}
                    onClick={handleMenuItemClick}
                    className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-black rounded-md transition-colors duration-200 font-medium"
                  >
                    <SeparatorVertical className="w-6 h-6 -ml-2 shrink-0" />
                    <span className="text-sm font-medium">{route.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Stopka bocznego panelu */}
      <SidebarFooter>
        <SidebarMenu>
          {footer.map((route) => (
            <SidebarMenuItem key={route.path}>
              <SidebarMenuButton
                asChild
                className="group transition-all duration-200 hover:text-blue-600"
              >
                <Link
                  to={route.path}
                  onClick={handleMenuItemClick}
                  className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-red-600 rounded-md transition-colors duration-200 font-medium"
                >
                  <Settings className="w-6 h-6 -ml-2 shrink-0" />
                  <span className="text-sm font-medium">{route.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
