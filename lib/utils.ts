import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTimeString(date?: dayjs.ConfigType) {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}