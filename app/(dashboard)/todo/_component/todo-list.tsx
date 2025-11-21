"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ISelectTodo } from "@/model/todo.model";
import { useQuery } from "@tanstack/react-query";

interface ITodoListProps {
  initList: ISelectTodo[];
}
export default function TodoList({ initList }: ITodoListProps) {
  const query = useQuery<ISelectTodo[]>({
    queryKey: ["todo-list"],
    queryFn: async () => {
      const res = await fetch("/api/todo/list");
      const data = await res.json();
      return data.list;
    },
    initialData: initList,
  });

  return (
    <Card>
      <CardContent>
        {query.data?.map((todo) => (
          <div key={todo.id}>{todo.title}</div>
        ))}
      </CardContent>
    </Card>
  );
}
