import prisma from "../src/config/database";

export async function cleanDB() {
    await prisma.network.deleteMany({});
    await prisma.credential.deleteMany({});
    await prisma.session.deleteMany({});
    await prisma.user.deleteMany({});
}