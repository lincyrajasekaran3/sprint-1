import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export async function transactionDemo() {
  try {
    await prisma.$transaction(async (tx) => {
      const project = await tx.project.create({
        data: {
          name: "Transaction Demo Project",
          userId: 1,
        },
      });

      await tx.task.create({
        data: {
          title: null, // triggers rollback
          projectId: project.id,
        },
      });
    });
  } catch (error) {
    console.error("Transaction failed. Rolling back.");
  }
}
