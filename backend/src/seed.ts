import prisma from "./config/prisma";
import { hashPassword } from "./utils/password";

async function main() {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: "admin@test.com",
    },
  });

  if (existingUser) {
    console.log("Admin user already exists.");
    return;
  }

  const hashedPassword = await hashPassword("123456");

  await prisma.user.create({
    data: {
      name: "Administrator",
      email: "admin@test.com",
      password: hashedPassword,
    },
  });

  console.log("✅ Admin user created.");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });