import { CreateUserParams } from "../services/users-service/index";
import joi from "joi";

export const createUserSchema = joi.object<CreateUserParams>({
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
});
