import { Hono } from "hono";
import { createTodo, getUsersTodoList } from "../serveice/todo.service";
import { createTodoSchema } from "@/model/todo.model";
import { revalidatePath } from "next/cache";

const app = new Hono();

app.get("/list", async (c) => {
  const { id } = c.get("user");
  const list = await getUsersTodoList(id);
  return c.json({ list });
});

app.post("/create", async (c) => {
  const { id } = c.get("user");
  const todo = createTodoSchema.parse(await c.req.json());
  const newTodo = await createTodo({ ...todo, userId: id });
  revalidatePath("/todo");
  return c.json({ message: "Todo created", todo: newTodo });
})

export const todoRoute = app;
