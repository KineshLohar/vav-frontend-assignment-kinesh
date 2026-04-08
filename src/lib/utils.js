import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const getJobStatus = (expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate);

  // Remove time for accurate day comparison
  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  if (expiry < today) {
    return { status: "expired", daysRemaining: 0 };
  }

  const diffTime = expiry - today;
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return { status: "active", daysRemaining };
};