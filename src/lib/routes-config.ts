import React from "react";

export interface RouteConfig {
  path: string;
  name: string;
  prefix: string | null;
  component: React.LazyExoticComponent<React.ComponentType>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pages = import.meta.glob("../pages/*.tsx") as Record<string, any>;

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      component: React.lazy(pages[path] as any),
    };
  });
