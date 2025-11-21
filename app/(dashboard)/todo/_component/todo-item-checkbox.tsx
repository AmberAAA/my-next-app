"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ISelectTodo } from "@/model/todo.model";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ITodoItemCheckboxProps {
  todo: ISelectTodo;
}

export const TodoItemCheckbox = (props: ITodoItemCheckboxProps) => {
  const { todo } = props;
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (todo: ISelectTodo) => {
      await fetch(`/api/todo/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo-list"] });
    },
  });
  return (
    <Checkbox
      checked={todo.completed}
      onCheckedChange={(e) => {
        console.log(e);
        mutate({ ...todo, completed: e === true });
      }}
    />
  );
};
