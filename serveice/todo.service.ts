import { db } from "@/db";
import { todosTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUsersTodoList = async (userId: number) => {
  const list = await db.query.todosTable.findMany({
    where: eq(todosTable.userId, userId),
  });
  return list;
};
