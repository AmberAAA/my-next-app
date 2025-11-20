import { removeSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function LogoutPage() {
  await removeSession;
  redirect("/login");
}
