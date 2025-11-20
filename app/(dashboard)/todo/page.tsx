import { logoutAction } from "@/app/actions/auth.actions";
import Link from "next/link";

export default function TodoPage() {

  return (
    <div>
      <Link href="#" onClick={logoutAction}>LOGOUT</Link>
    </div>
  );
}
