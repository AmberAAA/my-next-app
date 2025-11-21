import { todosTable } from "@/db/schema";
import z from "zod";

export const createTodoSchema = z.object({
  title: z.string(),
  completed: z.boolean().optional(),
  userId: z.number().optional()
});

export const updateTodoSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

export type ICreateTodoSchema = z.infer<typeof createTodoSchema>;

export type ISelectTodo = typeof todosTable.$inferSelect;

export type IUpdateTodoSchema = z.infer<typeof updateTodoSchema>;