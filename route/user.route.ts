import { createUserSchema } from "@/model/user.model";
import { createUser } from "@/serveice/user.service";
import { Hono } from "hono";

const app = new Hono();

app.post("/signup", async (c) => {
  const user = createUserSchema.parse(await c.req.json());
  const newUser = await createUser(user);
  return c.json({ message: "User created", user: newUser });
});

app.get("/login", async () => {});

export const userRoute = app;