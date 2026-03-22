import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppNavigationMenu } from "./components/app-navigation-menu.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import { AppSidebar } from "./components/app-sidebar.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { routes } from "./lib/routes-config";
import { ExampleNotification } from "./components/exampleNotification"; // <--- import naszego komponentu

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider defaultOpen={false}>
        <div className="w-full">
          <AppNavigationMenu />
          <AppSidebar />

          <main className="p-0">
            {/*Komponent powiadomień działa w całej apce */}
            <ExampleNotification />

            <Suspense
              fallback={
                <div className="flex items-center justify-center p-10">
                  Ładowanie...
                </div>
              }
            >
              <Routes>
                {routes.map(({ path, component: Element }) => (
                  <Route key={path} path={path} element={<Element />} />
                ))}
              </Routes>
            </Suspense>
          </main>
        </div>
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>,
);
