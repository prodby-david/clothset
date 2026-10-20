import { connectDatabase, db } from "./db.ts";

const users = [
  { email: "alice@prisma.io", name: "Alice", passwordHash: "placeholder" },
  { email: "bob@prisma.io", name: "Bob", passwordHash: "placeholder" },
  { email: "carol@prisma.io", name: "Carol", passwordHash: "placeholder" },
];

let pendingSeed: Promise<void> | undefined;

async function runSeed(): Promise<void> {
  await connectDatabase();

  for (const user of users) {
    await db.orm.public.User.upsert({
      create: user,
      update: {},
      conflictOn: { email: user.email },
    });
  }
}

export function seed(): Promise<void> {
  pendingSeed ??= runSeed().catch((error: unknown) => {
    pendingSeed = undefined;
    throw error;
  });
  return pendingSeed;
}
