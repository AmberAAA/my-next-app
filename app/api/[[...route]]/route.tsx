import { db } from "@/db";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { todoRoute } from "./todo.route";
export const dynamic = "force-dynamic";

const app = new Hono().basePath("/api");

app.route("/todo", todoRoute);

export const GET = handle(app);
