import { getTodoList } from "./api/[[...route]]/serveice/todo.service";

export default async function Home() {
  const list = await getTodoList();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <pre>{JSON.stringify(list, null, 2)}</pre>
    </div>
  );
}
