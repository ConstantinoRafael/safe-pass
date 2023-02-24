import { Request, Response } from "express";
import httpStatus from "http-status";
import authenticationService, {
  SignInParams,
} from "../services/autentication-service/index";

export async function signInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });

    return res.status(200).send(result);
  } catch (error) {
      (error.message)
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
