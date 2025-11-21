"use client";

import { useRef } from "react";
import { Input } from "../../../../components/ui/input";
import { ICreateTodoSchema } from "@/model/todo.model";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function CreateTodoInline() {
  const ref = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const isComposition = useRef(false);

  const handleAdd = useMutation({
    mutationFn: async (todo: ICreateTodoSchema) => {
      return await fetch("/api/todo/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo-list"] });
    },
  })
  return (
    <Input
      type="text"
      ref={ref}
      placeholder="Create a new todo"
      onCompositionStart={() => isComposition.current = true}
      onCompositionEnd={() => isComposition.current = false}
      onKeyDown={(e) => {
        const title = ref.current?.value?.trim();
        if (e.key === "Enter" && !isComposition.current && title) {
          handleAdd.mutate({ title });
          ref.current!.value = "";
        }
      }}
    />
  );
}
