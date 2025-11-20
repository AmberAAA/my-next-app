import { Hono } from "hono";
import { getTodoList } from "../serveice/todo.service";

const app = new Hono();

app.get("/list", async (c) => {
  const list = await getTodoList();
  return c.json({ list });
});


export const todoRoute = app;
