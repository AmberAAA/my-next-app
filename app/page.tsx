import { Button } from "@/components/ui/button";
import { verifySession } from "@/lib/session";
import Link from "next/link";

export default async function Home() {
  const { isAuth, user } = await verifySession();
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Link href="/logout">
        <Button>Logout</Button>
        {isAuth && <p>Welcome {user!.name}</p>}
      </Link>
    </div>
  );
}
