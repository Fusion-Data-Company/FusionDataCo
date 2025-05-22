import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, yearly = false): string {
  const discountedPrice = yearly ? price * 0.8 : price;
  return `$${discountedPrice}`;
}
