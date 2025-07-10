// const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("../src/generated/prisma");

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash("admin123", 10);
    await prisma.user.upsert({
        where: { email: "admin@admin.com" },
        update: {},
        create: {
            email: "admin@admin.com",
            password,
        },
    });
    console.log("Seeder selesai: admin@admin.com | admin123");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
