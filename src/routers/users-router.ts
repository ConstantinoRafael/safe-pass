import { Router } from "express";
import { signUp } from "../controllers/users-controller";
import { validateBody } from "../middlewares/validation-middleware";
import { createUserSchema } from "../schemas/users-schemas";

const usersRouter = Router();

usersRouter.post("/", validateBody, signUp);

export { usersRouter };
