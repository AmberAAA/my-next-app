import { CreateTodoInline } from "@/components/todo/create-inline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { verifySession } from "@/lib/session";
import { getUsersTodoList } from "@/serveice/todo.service";

export default async function TodoPage() {
  const { userId } = await verifySession();
  const list = await getUsersTodoList(userId!);

  return (
    <div>
      <CreateTodoInline />
      <Card>
        <CardHeader>
          <CardTitle>TODO LIST</CardTitle>
        </CardHeader>
        <CardContent>
          {list.map((todo) => (
            <div key={todo.id}>{todo.title}</div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
