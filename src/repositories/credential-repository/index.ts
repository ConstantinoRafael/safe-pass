import prisma from "../../config/database";
import { Credential } from "@prisma/client";
import { Prisma } from "@prisma/client";

export type CredentialInput = Omit<Credential, "id">;

async function getCredentials(userId: number) {
  return await prisma.credential.findMany({
    where: {
      userId,
    },
  });
}

async function getSpecificCredential(id: number, userId: number) {
  return await prisma.credential.findFirst({
    where: {
      id,
      userId,
    },
  });
}

async function getCredentialByTitleAndUserId(title: string, userId: number) {
  return await prisma.credential.findFirst({
    where: {
      title,
      userId,
    },
  });
}

async function createCredential(
  data: Prisma.CredentialUncheckedCreateInput) {
  return await prisma.credential.create({
    data,
  });
}

async function deleteCredential(id: number, userId: number) {
  return await prisma.credential.delete({
    where: {
      id
    }
  })
}

const credentialsRepository = {
  getCredentials,
  getSpecificCredential,
  getCredentialByTitleAndUserId,
  createCredential,
  deleteCredential
};

export default credentialsRepository;
