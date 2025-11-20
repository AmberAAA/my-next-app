"use server";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { createUserSchema, loginUserSchema } from "@/model/user.model";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { createSession, removeSession } from "@/lib/session";
import { createUser } from "@/serveice/user.service";

export const loginAction = async (formData: unknown) => {
  const body = loginUserSchema.parse(formData);
  const user = await db.query.usersTable.findFirst({
    where: and(
      eq(usersTable.email, body.email),
      eq(usersTable.password, body.password)
    ),
  });
  if (user) {
    await createSession(user!.id);
    redirect("/todo");
  }
};

export const signupAction = async (formData: unknown) => {
  const body = createUserSchema.parse(formData);
  const user = await createUser(body);
  if (user) {
    await createSession(user!.id);
    redirect("/");
  }
};

export const logoutAction = async () => {
  await removeSession();
  redirect("/login");
};