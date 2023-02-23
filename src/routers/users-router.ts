import { Router } from "express";
import { signUp } from "../controllers/users-controller.js";
import { validateBody } from "../middlewares/validation-middleware.js";
import { createUserSchema } from "../schemas/users-schemas.js";

const usersRouter = Router();

usersRouter.post("/", validateBody(createUserSchema), signUp);

export { usersRouter };
