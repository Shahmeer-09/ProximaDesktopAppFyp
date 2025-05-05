import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getTruncatedText = (text: string, length: number) => {
  if (!text) return "";
  return text.slice(0, length||30) + "...";
}