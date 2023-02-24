import { Router } from "express";
import { validateBody } from "../middlewares/validation-middleware";
import { signInSchema } from "../schemas/authentication-schemas";
import { signInPost } from "../controllers/authentication-controller";

const authenticationRouter = Router();

authenticationRouter.post("/sign-in", validateBody(signInSchema), signInPost);

export { authenticationRouter };
