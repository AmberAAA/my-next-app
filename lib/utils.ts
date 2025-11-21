import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { Hook } from "@hono/zod-validator";
import type { Env } from "hono";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTimeString(date?: dayjs.ConfigType) {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}

// 统一的验证错误处理函数 - 使用 Hook 类型的正确签名
export const handleValidationError: Hook<unknown, Env, string, "json"> = (
  result,
  c
) => {
  if (!result.success) {
    return c.json(
      {
        success: false,
        message: "验证失败",
        errors: result.error.issues.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      },
      400
    );
  }
};
