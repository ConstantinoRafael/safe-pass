import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter.post("/sign-in");

export { authenticationRouter };
