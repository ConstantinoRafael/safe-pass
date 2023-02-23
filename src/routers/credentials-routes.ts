import { Router } from "express";
import {
  createCredential,
  deleteCredential,
  getCredentials,
  getSpecificCredential,
} from "../controllers/credentials-controller";
import { authenticateToken } from "../middlewares/authentication-middleware";

const credentialsRouter = Router();

credentialsRouter
  
  .get("/", authenticateToken, getCredentials)
  .get("/:id", authenticateToken, getSpecificCredential)
  .post("/", authenticateToken, createCredential)
  .delete("/", authenticateToken, deleteCredential);

export default credentialsRouter;
