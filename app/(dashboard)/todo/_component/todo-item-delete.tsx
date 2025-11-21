"use client";
import { Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

interface ITodoItemDeleteProps {
  id: number;
}

export const TodoItemDelete = ({ id }: ITodoItemDeleteProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/todo/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo-list"] });
    },
  });
  return (
    <Trash2 className=" size-4 cursor-pointer" onClick={() => mutate(id)} />
  );
};
