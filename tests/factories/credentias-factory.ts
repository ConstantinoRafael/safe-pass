import { faker } from "@faker-js/faker";
import prisma from "../../src/config/database";

export async function createCredential(userId: number) {
  return await prisma.credential.create({
    data: {
      userId: userId,
      title: faker.datatype.string(),
      url: faker.datatype.string(),
      password: faker.datatype.string(),
      username: faker.datatype.string(),
    },
  });
}
