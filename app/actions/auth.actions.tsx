import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { createUserSchema } from "@/model/user.model";

export async function signup(formData: FormData) {
  const user = createUserSchema.parse(formData);
  const newUser = await db.insert(usersTable).values(user).returning();
  return newUser[0];
}
