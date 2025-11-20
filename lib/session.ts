import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { ISelectUser } from "@/model/user.model";
import { cookies } from "next/headers";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: ISelectUser) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    if (payload.exp && payload.exp > Date.now() / 1000) {
      return payload as ISelectUser;
    }
  } catch (error) {
    console.error("Failed to verify session", error);
  }
  return null;
}

export async function createSession(id: number) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, id),
  });
  const session = await encrypt(user!);
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.id) {
    return { isAuth: false };
  }

  return { isAuth: true, userId: session.id, user: session };
});

export const removeSession = cache(async () => {
  const cookieStore = await cookies();
  cookieStore.delete("session");
});