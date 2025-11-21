import { Hono } from "hono";
import {
  createTodo,
  deleteTodo,
  getUsersTodoList,
  updateTodo,
} from "../serveice/todo.service";
import {
  createTodoSchema,
  deleteTodoSchema,
  updateTodoSchema,
} from "@/model/todo.model";
import { zValidator } from "@hono/zod-validator";
import { handleValidationError } from "@/lib/utils";

const app = new Hono();

app.get("/list", async (c) => {
  const { id } = c.get("user");
  const list = await getUsersTodoList(id);
  return c.json({ list });
});

app.post(
  "/create",
  zValidator("json", createTodoSchema, handleValidationError),
  async (c) => {
    const { id } = c.get("user");
    const todo = c.req.valid("json");
    const newTodo = await createTodo({ ...todo, userId: id });
    return c.json({ success: true, message: "Todo created", todo: newTodo });
  }
);

app.put(
  "/update",
  zValidator("json", updateTodoSchema, handleValidationError),
  async (c) => {
    const todo = c.req.valid("json");
    const updatedTodo = await updateTodo(todo);
    return c.json({
      success: true,
      message: "Todo updated",
      todo: updatedTodo,
    });
  }
);

app.post(
  "/delete",
  zValidator("json", deleteTodoSchema, handleValidationError),
  async (c) => {
    const { id } = c.req.valid("json");
    const deletedTodo = await deleteTodo(id);
    return c.json({
      success: true,
      message: "Todo deleted",
      todo: deletedTodo,
    });
  }
);

export const todoRoute = app;
