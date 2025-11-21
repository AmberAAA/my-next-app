import { todosTable } from "@/db/schema";
import * as z from "zod";

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

export const deleteTodoSchema = z.object({
  id: z.number(),
});

export type ICreateTodoSchema = z.infer<typeof createTodoSchema>;

export type ISelectTodo = typeof todosTable.$inferSelect;

export type IUpdateTodoSchema = z.infer<typeof updateTodoSchema>;