import { Request, Response } from "express";
import httpStatus from "http-status";
import netwoksService from "../services/networks-service/index";

export async function getNetworks(req: Request, res: Response) {
  const userId = parseInt(req.userId);

  try {
    const networks = await netwoksService.getNetworks(userId);

    return res.status(httpStatus.OK).send(networks);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function getSpecificNetwork(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const userId = Number(req.userId);

  try {
    const network = await netwoksService.getSpecificNetwork(id, userId);

    return res.status(httpStatus.OK).send(network);
  } catch (error) {
    if (error.message === "not_found") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(500);
  }
}

export async function createNetwork(req: Request, res: Response) {
  const userId = Number(req.userId);

  const { title, network, password } = req.body;

  try {
    const networkCreated = await netwoksService.createNetwork({
      userId,
      title,
      network,
      password,
    });

    return res.status(httpStatus.OK).send(networkCreated);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function deleteNetwork(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const userId = Number(req.userId);

  try {
    await netwoksService.deleteNetwork(id, userId);

    return res.sendStatus(httpStatus.OK)

  } catch ( error ) {
    if (error.message === "not_found") {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
  
      return res.sendStatus(500);
  }
}
