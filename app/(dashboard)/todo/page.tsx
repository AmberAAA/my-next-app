import { CreateTodoInline } from "@/app/(dashboard)/todo/_component/create-inline";
import { verifySession } from "@/lib/session";
import { getUsersTodoList } from "@/serveice/todo.service";
import TodoList from "./_component/todo-list";

export default async function TodoPage() {
  const { userId } = await verifySession();
  const list = await getUsersTodoList(userId!);

  return (
    <div>
      <CreateTodoInline />
      <TodoList initList={list} />
    </div>
  );
}
