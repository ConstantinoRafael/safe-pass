import { CreateCredentialParams } from "../services/credentials-service/index";
import joi from "joi";

export const credentialSchema = joi.object<CreateCredentialParams>({
  url: joi.string().required(),
  username: joi.string().required(),
  password: joi.string().required(),
});
