import { User } from "@prisma/client";
import prisma from "../../config/database";

async function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function create(data: UserInput) {
  return prisma.user.create({
    data,
  });
}

const userRepository = {
  findByEmail,
  create,
};

type UserInput = Omit<User, "id">;

export default userRepository;
