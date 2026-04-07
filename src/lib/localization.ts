/* Lightweight i18n shim — reads from src/locales/en/*.json */

const cache: Record<string, Record<string, any>> = {};

function loadNamespace(ns: string): Record<string, any> {
  if (cache[ns]) return cache[ns];
  try {
    // Dynamic require resolved at build time via webpack
    const data = require(`../locales/en/${ns}.json`);
    cache[ns] = data;
    return data;
  } catch {
    return {};
  }
}

function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? path;
}

export function t(key: string): string {
  // key format: "glpWelcome.title" → namespace "glpWelcome", path "title"
  const dotIndex = key.indexOf('.');
  if (dotIndex === -1) return key;

  const ns = key.substring(0, dotIndex);
  const path = key.substring(dotIndex + 1);
  const data = loadNamespace(ns);
  const value = getNestedValue(data, path);
  return typeof value === 'string' ? value : key;
}

export default { t };
