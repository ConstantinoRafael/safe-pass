import { Router } from "express";
import {
  createCredential,
  deleteCredential,
  getCredentials,
  getSpecificCredential,
} from "../controllers/credentials-controller.js";
import { authenticateToken } from "../middlewares/authentication-middleware.js";

const credentialsRouter = Router();

credentialsRouter
  
  .get("/", authenticateToken, getCredentials)
  .get("/:id", authenticateToken, getSpecificCredential)
  .post("/", authenticateToken, createCredential)
  .delete("/:id", authenticateToken, deleteCredential);

export default credentialsRouter;
