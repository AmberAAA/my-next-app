"use client";

import { useRef } from "react";
import { Input } from "../ui/input";
import { ICreateTodoSchema } from "@/model/todo.model";

export function CreateTodoInline() {
  const ref = useRef<HTMLInputElement>(null);
  const add = ({ title }: ICreateTodoSchema) => {
    fetch("/api/todo/create", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
  };
  return (
    <Input
      type="text"
      ref={ref}
      placeholder="Create a new todo"
      onKeyUp={(e) => {
        const title = ref.current?.value?.trim();
        if (e.key === "Enter" && title) {
          add({ title });
          ref.current!.value = "";
        }
      }}
    />
  );
}
