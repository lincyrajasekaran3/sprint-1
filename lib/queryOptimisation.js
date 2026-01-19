import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

export async function queryExamples() {
  // Bad: over-fetching
  await prisma.user.findMany({
    include: { projects: true },
  });

  // Good: optimized
  await prisma.user.findMany({
    select: { id: true, email: true },
  });

  // Pagination
  await prisma.task.findMany({
    skip: 0,
    take: 10,
    orderBy: { createdAt: "desc" },
  });
}
