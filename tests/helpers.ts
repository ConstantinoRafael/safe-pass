import { User } from "@prisma/client";
import prisma from "../src/config/database";
import { createUser } from "./factories/users-factory";
import * as jwt from "jsonwebtoken";
//import { createSession } from "./factories/sessions-factory";
import { faker } from "@faker-js/faker";

export async function cleanDB() {
  await prisma.network.deleteMany({});
  await prisma.credential.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
}
const generateValidBody = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(10),
});

export async function generateValidToken(user?: User) {
  const body = generateValidBody();
  const incomingUser = user || (await createUser(body));
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  return token;
}

