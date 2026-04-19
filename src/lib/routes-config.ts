import React from "react";

export interface RouteConfig {
  path: string;
  name: string;
  prefix: string | null;
  component: React.LazyExoticComponent<React.ComponentType>;
}

const HIDDEN_UI_ROUTE_NAMES = new Set(["TestPushApi"]);

const pages = import.meta.glob<{ default: React.ComponentType }>(
  "../pages/*.tsx",
);

export const routes = Object.keys(pages)
  .filter((path) => !path.includes("_components"))
  .map((path) => {
    const fullFileName = path.split("/").pop()?.replace(".tsx", "") || "";
    const hasPrefix = fullFileName.includes("_");
    const prefix = hasPrefix ? fullFileName.split("_")[0] : null;
    const cleanName = hasPrefix ? fullFileName.split("_")[1] : fullFileName;

    const routePath =
      cleanName.toLowerCase() === "app" ? "/" : `/${cleanName.toLowerCase()}`;

    return {
      path: routePath,
      name: cleanName,
      prefix: prefix,
      component: React.lazy(() => pages[path]()),
    };
  });

export function isRouteVisibleInUi(route: RouteConfig) {
  return !HIDDEN_UI_ROUTE_NAMES.has(route.name);
}
