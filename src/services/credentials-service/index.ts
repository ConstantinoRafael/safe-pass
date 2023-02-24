import credentialsRepository from "../../repositories/credential-repository/index";
import { CredentialInput } from "../../repositories/credential-repository/index";
import Cryptr from "cryptr";

const cryptr = new Cryptr("safe");

async function getCredentials(userId: number) {
  const credentials = await credentialsRepository.getCredentials(userId);

  //credentials.map(async (c) => (c.password = await cryptr.decrypt(c.password)));

  return credentials;
}

async function getSpecificCredential(id: number, userId: number) {
  const credential = await credentialsRepository.getSpecificCredential(
    id,
    userId
  );

  if (!credential) {
    throw { message: "not_found" };
  }

  //const decryptrPassword = await cryptr.decrypt(credential.password);

  //credential.password = decryptrPassword;

  return credential;
}

async function createCredential({
  userId,
  title,
  url,
  password,
  username,
}: CreateCredentialParams) {
  const credentialTitleExists =
    await credentialsRepository.getCredentialByTitleAndUserId(title, userId);

  if (credentialTitleExists) {
    throw { message: "conflict" };
  }

  const cryptrPassword = await cryptr.encrypt(password);

  return credentialsRepository.createCredential({
    userId,
    title,
    url,
    password: cryptrPassword,
    username,
  });
}

async function deleteCredential(id: number, userId: number) {
  const credential = await credentialsRepository.getSpecificCredential(
    id,
    userId
  );

  if (!credential) {
    throw { message: "not_found" };
  }

  return credentialsRepository.deleteCredential(id, userId);
}

export type CreateCredentialParams = Pick<
  CredentialInput,
  "title" | "url" | "password" | "username" | "userId"
>;

const credentialsService = {
  getCredentials,
  getSpecificCredential,
  createCredential,
  deleteCredential,
};

export default credentialsService;
