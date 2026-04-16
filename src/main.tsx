import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppNavigationMenu } from "./components/app-navigation-menu.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import { AppSidebar } from "./components/app-sidebar.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { routes } from "./lib/routes-config";
import { TwentyRuleProvider } from "./context/twentyRuleProvidor.tsx";
import { TwentyMinutesRule } from "./components/twentyMinutesRule.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider defaultOpen={false}>
        <TwentyRuleProvider>
          {/* Komponent globalny - reguła 20-20-20 */}
          <TwentyMinutesRule />
          <div className="w-full">
            <AppNavigationMenu />
            <AppSidebar />

            <main className="p-0">
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
        </TwentyRuleProvider>
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>,
);
