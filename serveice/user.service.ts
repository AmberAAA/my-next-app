import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { createUserSchema, ICreateUser } from "@/model/user.model";

export const createUser = async (user: ICreateUser) => {
  const u = await db
    .insert(usersTable)
    .values(createUserSchema.parse(user))
    .returning();
  return u[0];
};
