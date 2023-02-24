import { Router } from "express";
import { validateBody } from "../middlewares/validation-middleware";
import { signInSchema } from "../schemas/authentication-schemas";
import { signInPost } from "../controllers/authentication-controller";
import { validateBodySignIn } from "../middlewares/validation-middleware";

const authenticationRouter = Router();

authenticationRouter.post("/sign-in", validateBodySignIn, signInPost);

export { authenticationRouter };
