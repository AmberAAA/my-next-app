"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTimeString } from "@/lib/utils";
import { ISelectTodo } from "@/model/todo.model";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TodoItemCheckbox } from "./todo-item-checkbox";

interface ITodoListProps {
  initList: ISelectTodo[];
}

const columns: ColumnDef<ISelectTodo>[] = [
  {
    header: "#",
    accessorKey: "completed",
    cell: ({ row }) => {
      return <TodoItemCheckbox todo={row.original} />;
    },
  },
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Updated At",
    accessorKey: "updatedAt",
    cell: ({ row }) => formatDateTimeString(row.original.updatedAt),
  },
];

export default function TodoTable({ initList }: ITodoListProps) {
  const query = useQuery<ISelectTodo[]>({
    queryKey: ["todo-list"],
    queryFn: async () => {
      const res = await fetch("/api/todo/list");
      const data = await res.json();
      return data.list;
    },
    initialData: initList,
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable<ISelectTodo>({
    data: query.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
