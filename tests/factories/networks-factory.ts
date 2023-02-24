import { faker } from "@faker-js/faker";
import prisma from "../../src/config/database";

export async function createNetwork(userId: number) {
  return await prisma.network.create({
    data: {
      userId: userId,
      title: faker.datatype.string(),
      password: faker.datatype.string(),
      network: faker.datatype.string(),
    },
  });
}
