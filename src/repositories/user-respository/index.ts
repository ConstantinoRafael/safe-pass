import { Prisma } from "@prisma/client";
import prisma from "../../config/database";

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

const userRepository = {
  findByEmail,
  create,
};


export default userRepository;
