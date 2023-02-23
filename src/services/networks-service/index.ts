import { Prisma } from "@prisma/client";
import Cryptr from "cryptr";
import networksRepository from "../../repositories/network-repository/index.js";

const cryptr = new Cryptr("safe password");

async function getNetworks(userId: number) {
  const networks = await networksRepository.getNetworks(userId);
  return networks;
}

async function getSpecificNetwork(id: number, userId: number) {
  const network = await networksRepository.getSpecificNetwork(id, userId);

  if (!network) {
    throw { message: "not_found" };
  }

  return network;
}

async function createNetwork({
  userId,
  title,
  network,
  password,
}: CreateNetworkParams) {
  const cryptrPassword = await cryptr.encrypt(password);

  return networksRepository.createNetwork({
    userId,
    title,
    network,
    password: cryptrPassword,
  });
}

async function deleteNetwork(id: number, userId: number) {
  const network = await networksRepository.getSpecificNetwork(id, userId);

  if (!network) {
    throw { message: "not_found" };
  }

  return networksRepository.deleteNetwork(id, userId);
}

type CreateNetworkParams = {
  userId: number;
  title: string;
  network: string;
  password: string;
};

const netwoksService = {
  createNetwork,
  getNetworks,
  getSpecificNetwork,
  deleteNetwork,
};

export default netwoksService;
