import React from "react";

export interface RouteConfig {
  path: string;
  name: string;
  prefix: string | null;
  component: React.LazyExoticComponent<React.ComponentType>;
}

const pages = import.meta.glob<{ default: React.ComponentType }>(
  "../pages/*.tsx",
);

const splitFirst = (str: string, separator: string): [string | null, string] => {
  const index = str.indexOf(separator);
  if (index === -1) {
    return [null, str];
  }
  return [str.slice(0, index), str.slice(index + 1)];
};


export const routes = Object.keys(pages)
  .filter((path) => !path.includes("_components"))
  .map((path) => {
    const fullFileName = path.split("/").pop()?.replace(".tsx", "") || "";
    const [prefix, cleanName] = splitFirst(fullFileName, "_");
    const menuName = cleanName.replaceAll("_", " ");

    const routePath =
      cleanName.toLowerCase() === "app" ? "/" : `/${cleanName.toLowerCase()}`;

    return {
      path: routePath,
      name: menuName,
      prefix: prefix,
      component: React.lazy(() => pages[path]()),
    };
  });
