import { db } from "./db.ts";

export { db };

export async function listUsers(limit = 10) {
  const users = await db.orm.public.User.select("id", "email", "name", "createdAt").limit(limit).all();

  return users.map((user) => ({
    id: user.id,
    email: user.email,
    name: user.name ?? null,
    createdAt: user.createdAt,
  }));
}

export type StarterUser = Awaited<ReturnType<typeof listUsers>>[number];
