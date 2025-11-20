import { db } from "@/db";

export const getTodoList = async () => {
  const list = await db.query.todosTable.findMany();
  return list;
};
