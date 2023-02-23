import prisma from "../../config/database";
import { Credential } from "@prisma/client";

export type CredentialInput = Omit<Credential, "id">;

async function getCredentials(userId: number) {
  return await prisma.credential.findMany({
    where: {
      userId,
    },
  });
}

async function getSpecificCredential(id: number) {
  return await prisma.credential.findFirst({
    where: {
      id,
    },
  });
}

const credentialsRepository = {
  getCredentials,
  getSpecificCredential,
};

export default credentialsRepository;
