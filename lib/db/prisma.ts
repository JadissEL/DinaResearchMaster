import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL;
  if (!url) return false;
  // Skip placeholder local URLs until a real database is provisioned
  if (/localhost|127\.0\.0\.1/.test(url) && !process.env.DATABASE_FORCE_LOCAL) {
    return false;
  }
  return true;
}
