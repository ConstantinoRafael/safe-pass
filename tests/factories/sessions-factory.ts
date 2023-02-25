import { Session } from "@prisma/client";
import { createUser } from "./users-factory";
import prisma from "../../src/config/database";
import { faker } from "@faker-js/faker";

// export async function createSession(token: string): Promise<Session> {

//   const generateValidBody = () => ({
//     email: faker.internet.email(),
//     password: faker.internet.password(10),
//   });

//   const body = generateValidBody()

//   const user = await createUser(body);

//   return prisma.session.create({
//     data: {
//       token: token,
//       userId: user.id,
//     },
//   });
// }