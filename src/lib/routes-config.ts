import React from 'react';

export interface RouteConfig {
  path: string;
  name: string;
  prefix: string | null;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
}

const pages = import.meta.glob('../pages/*.tsx');

export const routes = Object.keys(pages).map((path) => {

  const fullFileName = path.split('/').pop()?.replace('.tsx', '') || '';
  const hasPrefix = fullFileName.includes('_');
  const prefix = hasPrefix ? fullFileName.split('_')[0] : null;
  const cleanName = hasPrefix ? fullFileName.split('_')[1] : fullFileName;
  
  const routePath = cleanName.toLowerCase() === 'app' ? '/' : `/${cleanName.toLowerCase()}`;

return {
    path: routePath,
    name: cleanName,
    prefix: prefix,
    component: React.lazy(pages[path] as any)
  };
});