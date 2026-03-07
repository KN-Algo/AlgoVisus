import { Link } from "react-router-dom"
import { SidebarTrigger } from "./ui/sidebar"

export function AppNavigationMenu() {
  return (
<header className="sticky top-0 z-5 w-full border-b bg-background/95 backdrop-blur">
  <div className="flex h-16 items-center px-4">
    
    {/* LEWA STRONA: Znaczek Sidebar */}
    <div className="flex w-1/4 justify-start">
    </div>

    {/* ŚRODEK: Logo/Nazwa */}
    <div className="flex w-2/4 justify-center">
                  <Link to={"/"} className="flex w-2/4 justify-center">
                    <span className="text-2xl font-bold tracking-tight">{"AlgoVisus"}</span>
                  </Link>
    </div>

    {/* PRAWA STRONA: Puste miejsce dla symetrii, mozna tam cos dodac */}
    <div className="flex w-1/4 justify-end">
    <SidebarTrigger />
    </div>

  </div>
</header>
  )
}