import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppNavigationMenu } from "./components/app-navigation-menu.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import { AppSidebar } from "./components/app-sidebar.tsx";
import { BrowserRouter, Routes, Route, } from 'react-router-dom';


function Autorzy() {
  return (
    <div className="min-h-screen w-full px-8 text-center bg-gray-400 flex flex-col justify-center">
      <h1 className="text-5xl font-bold">Autorzy</h1>
    </div>
  );
}

function Ustawienia() {
  return (
    <div className="min-h-screen w-full px-8 text-center bg-gray-400 flex flex-col justify-center">
      <h1 className="text-5xl font-bold">Ustawienia</h1>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <SidebarProvider  defaultOpen={false}>
        <div className="w-full">
          <AppNavigationMenu />
          <AppSidebar/>

          <main className="p-0">
            <BrowserRouter>


      {/* Podstrony */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/autorzy" element={<Autorzy />} />
        <Route path="/ustawienia" element={<Ustawienia />} />
      </Routes>


            </BrowserRouter>
          </main>
        </div>
      </SidebarProvider>
  </StrictMode>
);
