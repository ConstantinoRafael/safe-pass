import { Request, Response } from "express";
import httpStatus from "http-status";
import "express-async-errors";
import credentialsService from "../services/credentials-service/index";

export async function getCredentials(req: Request, res: Response) {
  const userId = parseInt(req.userId);

  try {
    const credentials = await credentialsService.getCredentials(userId);

    return res.status(httpStatus.OK).send(credentials);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function getSpecificCredential(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const userId = Number(req.userId);
  try {
    const credential = await credentialsService.getSpecificCredential(
      id,
      userId
    );

    return res.status(httpStatus.OK).send(credential);
  } catch (error) {
    if (error.message === "not_found") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(500);
  }
}

export async function createCredential(req: Request, res: Response) {
  const userId = Number(req.userId);
  const { title, url, username, password } = req.body;

  try {
    const credential = await credentialsService.createCredential({
      userId,
      title,
      url,
      username,
      password,
    });

    return res.status(httpStatus.OK).send(credential);
  } catch (error) {
    if (error.message === "conflict") {
      return res.sendStatus(httpStatus.CONFLICT);
    }
    return res.sendStatus(500);
  }
}

export async function deleteCredential(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const userId = Number(req.userId);

  try {
    await credentialsService.deleteCredential(id, userId);

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.message === "not_found") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.sendStatus(500);
  }
}
