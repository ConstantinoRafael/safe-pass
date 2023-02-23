import { Request, Response } from "express";
import httpStatus from "http-status";
//import { AuthenticatedRequest } from "../middlewares/authentication-middleware";
import credentialsService from "../services/credentials-service";

export async function getCredentials(req: Request, res: Response) {
  const userId = Number(req.userId);

  try {
    const credentials = await credentialsService.getCredentials(userId);

    return res.status(httpStatus.OK).send(credentials);
  } catch (error) {}
}

export async function getSpecificCredential(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  try {
    const credential = await credentialsService.getSpecificCredential(id);

    return res.send(credential);
  } catch (error) {}
}

export async function createCredential() {}

export async function deleteCredential() {}
