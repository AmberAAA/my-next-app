import { db } from "@/db";
import { todosTable } from "@/db/schema";
import { ICreateTodoSchema, IUpdateTodoSchema } from "@/model/todo.model";
import { asc, desc, eq } from "drizzle-orm";

export const getUsersTodoList = async (userId: number) => {
  const list = await db.query.todosTable.findMany({
    where: eq(todosTable.userId, userId),
    orderBy: [asc(todosTable.completed), desc(todosTable.updatedAt)],
  });
  return list;
};

export const createTodo = async (todo: ICreateTodoSchema) => {
  const newTodo = await db.insert(todosTable).values(todo).returning();
  return newTodo[0];
};

export const updateTodo = async (todo: IUpdateTodoSchema) => {
  const { id, ...data } = todo;
  const updatedTodo = await db
    .update(todosTable)
    .set(data)
    .where(eq(todosTable.id, id))
    .returning();
  return updatedTodo[0];
};

export const deleteTodo = async (id: number) => {
  const deletedTodo = await db.delete(todosTable).where(eq(todosTable.id, id)).returning();
  return deletedTodo[0];
};
