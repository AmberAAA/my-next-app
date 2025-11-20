import { verifySession } from "@/lib/session";
import { ISelectUser } from "@/model/user.model";
import { todoRoute } from "@/route/todo.route";
import { userRoute } from "@/route/user.route";
import { Hono } from "hono";
import { handle } from "hono/vercel";
export const dynamic = "force-dynamic";

const app = new Hono().basePath("/api");

declare module "hono" {
  interface ContextVariableMap {
    user: ISelectUser
  }
}


app.use("/*", async (c, next) => {
  const { user } = await verifySession();
  if (user) {
    c.set("user", user);
  }
  await next();
});


app.route("/todo", todoRoute);
app.route("/user", userRoute);

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const OPTIONS = handle(app);
