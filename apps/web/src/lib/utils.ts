import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function updateSearchParams(params: Record<string, string | number | boolean>): void {
  const url = new URL(window.location.href);

  // Merge new parameters into existing ones
  Object.keys(params).forEach((key) => {
    url.searchParams.set(key, String(params[key])); // Add or update the parameter
  });

  // Update the browser's URL without reloading
  window.history.pushState({}, '', url);
}

