import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...values: ClassValue[]): string {
  return twMerge(clsx(values));
}

export function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isMobileUserAgentData() {
  if (typeof navigator === "undefined" || !navigator.userAgent) {
    return false;
  }

  return navigator.userAgent.toLowerCase().includes("mobile");
}
