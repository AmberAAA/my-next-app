import { db } from "@/db";
import { todosTable } from "@/db/schema";
import { ICreateTodoSchema } from "@/model/todo.model";
import { eq } from "drizzle-orm";

export const getUsersTodoList = async (userId: number) => {
  const list = await db.query.todosTable.findMany({
    where: eq(todosTable.userId, userId),
  });
  return list;
};

export const createTodo = async (todo: ICreateTodoSchema) => {
  const newTodo = await db.insert(todosTable).values(todo).returning();
  return newTodo[0];
}