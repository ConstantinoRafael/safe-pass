import { faker } from "@faker-js/faker";
import prisma from "../../src/config/database";
import { Prisma, Credential } from "@prisma/client";

export async function createCredential(data: CredentialInput) {

  return await prisma.credential.create({
    data,
  });
}

export type CredentialInput = Omit<Credential, "id">;
