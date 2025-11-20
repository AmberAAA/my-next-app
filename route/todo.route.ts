import { Hono } from "hono";
import { getUsersTodoList } from "../serveice/todo.service";

const app = new Hono();

app.get("/list", async (c) => {
  const { id } = c.get("user");
  const list = await getUsersTodoList(id);
  return c.json({ list });
});

export const todoRoute = app;
