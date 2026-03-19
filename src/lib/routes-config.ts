import React from "react";

export interface RouteConfig {
  path: string;
  name: string;
  prefix: string | null;
  component: React.LazyExoticComponent<React.ComponentType>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pages = import.meta.glob("../pages/**/App.tsx") as Record<string, any>;

export const routes = Object.keys(pages).map((path) => {
  // Extract folder name from path (e.g., '../pages/home/App.tsx' -> 'home')
  const folderName = path.split("/")[3];

  // Map folder names to route names and paths
  const folderToRoute: {
    [key: string]: { name: string; path: string; prefix: string | null };
  } = {
    home: { name: "App", path: "/", prefix: null },
    exercises: {
      name: "Ósemka",
      path: "/exercises/ósemka",
      prefix: "exercises",
    },
    settings: { name: "Ustawienia", path: "/settings", prefix: null },
    authors: { name: "Autorzy", path: "/authors", prefix: null },
  };

  const route = folderToRoute[folderName] || {
    name: folderName,
    path: `/${folderName}`,
    prefix: null,
  };

  return {
    path: route.path,
    name: route.name,
    prefix: route.prefix,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.lazy(pages[path] as any),
  };
});
