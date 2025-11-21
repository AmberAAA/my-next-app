import { Hono } from "hono";
import { createTodo, getUsersTodoList, updateTodo } from "../serveice/todo.service";
import { createTodoSchema, updateTodoSchema } from "@/model/todo.model";

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
  return c.json({ message: "Todo created", todo: newTodo });
})

app.put("/update", async (c) => {
  const todo = updateTodoSchema.parse(await c.req.json());
  const updatedTodo = await updateTodo(todo);
  return c.json({ message: "Todo updated", todo: updatedTodo });
});
export const todoRoute = app;
