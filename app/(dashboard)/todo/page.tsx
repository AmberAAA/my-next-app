import { verifySession } from "@/lib/session";
import { getUsersTodoList } from "@/serveice/todo.service";
import TodoTable from "./_component/todo-table";
import { CreateTodoInline } from "./_component/create-inline";

export default async function TodoPage() {
  const { userId } = await verifySession();
  const list = await getUsersTodoList(userId!);

  return (
    <div>
      <CreateTodoInline />
      <TodoTable initList={list} />
    </div>
  );
}
