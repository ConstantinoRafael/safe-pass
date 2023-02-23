import { Router } from "express";
import { validateBody } from "../middlewares/validation-middleware.js";
import { signInSchema } from "../schemas/authentication-schemas.js";
import { signInPost } from "../controllers/authentication-controller.js";

const authenticationRouter = Router();

authenticationRouter.post("/sign-in", validateBody(signInSchema), signInPost);

export { authenticationRouter };
