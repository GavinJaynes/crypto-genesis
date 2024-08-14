import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncatedAddress = (address: `0x${string}`) =>
  `${address.substring(0, 12)}...${address.substring(address.length - 4)}`;

export const formatNumber = (number: number) => {
  // Use the toLocaleString method to add suffixes to the number
  return number.toLocaleString("en-US", {
    // add suffixes for thousands, millions, and billions
    // the maximum number of decimal places to use
    maximumFractionDigits: 3,
    // specify the abbreviations to use for the suffixes
    notation: "compact",
    compactDisplay: "short",
  });
};
