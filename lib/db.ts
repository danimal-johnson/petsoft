import { PrismaClient } from "./generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | null };

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient({
    adapter,
  });
}

const prisma = globalForPrisma.prisma;

export default prisma;

// if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
