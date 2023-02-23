import credentialsRepository from "../../repositories/credential-repository";

async function getCredentials(userId: number ) {
  const credentials = await credentialsRepository.getCredentials(userId);
  return credentials;
}

async function getSpecificCredential(id: number) {
  const credential = await credentialsRepository.getSpecificCredential(id);

  if (!credential) {
    throw { message: "not_found" };
  }

  return credential;
}

const credentialsService = {
  getCredentials,
  getSpecificCredential,
};

export default credentialsService;
