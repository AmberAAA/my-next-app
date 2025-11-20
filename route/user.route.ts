import {  decrypt } from "@/lib/session";
import { createUserSchema } from "@/model/user.model";
import { createUser } from "@/serveice/user.service";
import { Hono } from "hono";
import { cookies } from "next/headers";

const app = new Hono();

// TODO: 重构路由，对数据的操作，移到service层

app.post("/signup", async (c) => {
  const user = createUserSchema.parse(await c.req.json());
  const newUser = await createUser(user);
  return c.json({ message: "User created", user: newUser });
});

app.get("/logout", async (c) => {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  return c.json({ message: "Logout successful" });
});


app.get("/me", async (c) => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) {
    return c.json({ message: "Unauthorized" }, 401);
  }
  const user = await decrypt(session.value);
  
  
  return c.json({ message: "User found", user: user });
});


export const userRoute = app;
