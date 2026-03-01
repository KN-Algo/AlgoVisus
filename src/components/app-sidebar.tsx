import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {SeparatorVertical, Settings } from "lucide-react"

const projects = [

      {
    name: "Trening Akomodacji",
    url: "/trening-akomodacji",
    icon: "-",
  },

      {
    name: "Ósemka",
    url: "/osemka",
    icon: "-",
  },

        {
    name: "Śledzenie kropki",
    url: "/sledzenie-kropki",
    icon: "-",
  },

      {
    name: "Ruchy oczy do dali",
    url: "/dal",
    icon: "-",
  },
]

const other = [
        {
    name: "Autorzy",
    url: "/autorzy",
    icon: "-",
  },
]

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="offcanvas" className="z-50">

      {/* Nagłówek bocznego panelu*/ }
      <SidebarHeader className="py-6 flex items-center justify-center">
        <h1 className="text-2xl font-bold ">Logo</h1>
      </SidebarHeader>

        {/* Główna zawartość bocznego panelu  */}
        <SidebarContent>
          <SidebarGroup>
            <text className="text-sm font-semibold text-slate-500 tracking-wide">Ćwiczenia</text>
            <SidebarMenu>
          <div className="text-sm font-semibold text-slate-500 tracking-wide">
            {projects.map((project) => (
              <SidebarMenuItem key={project.name}>
            <SidebarMenuButton asChild className="group transition-all duration-200 hover:text-blue-600">
              <a 
                href={project.url} 
                className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-black rounded-md transition-colors duration-200 font-medium"
              >
                <SeparatorVertical className="w-6 h-6 -ml-2 -mr-2 shrink-0" />
                <text className="text-sm font-medium">{"  "}</text>
                <span>{project.name}</span>
              </a>
            </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </div>
            </SidebarMenu>
        </SidebarGroup> 

        <SidebarGroup>
          <text className="text-sm font-semibold text-slate-500 tracking-wide">Inne</text>
            <SidebarMenu>
          <div className="text-sm font-semibold text-slate-500 tracking-wide">
            {other.map((project) => (
              <SidebarMenuItem key={project.name}>
            <SidebarMenuButton asChild className="group transition-all duration-200 hover:text-blue-600">
              <a 
                href={project.url} 
                className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-black rounded-md transition-colors duration-200 font-medium"
              >
                <SeparatorVertical className="w-6 h-6 -ml-2 -mr-2 shrink-0" />
                <text className="text-sm font-medium">{"  "}</text>
                <span>{project.name}</span>
              </a>
            </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </div>
            </SidebarMenu>
        </SidebarGroup> 

        
      </SidebarContent>

      {/* Stopka bocznego panelu */ }
      <SidebarFooter>
<a href="/ustawienia" className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-red-600 rounded-md transition-colors duration-200 font-medium">
  <Settings className="w-5 h-5" />
  <span>Ustawienia</span>
</a>
      </SidebarFooter>

    </Sidebar>
  )
}