import { usersTable } from "@/db/schema";
import z from "zod";

export type ICreateUser = typeof usersTable.$inferInsert;

export type ISelectUser = typeof usersTable.$inferSelect;

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
});

export const loginUserSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type ILoginUser = z.infer<typeof loginUserSchema>;