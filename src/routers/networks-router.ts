import { Router } from "express";
import {
  createNetwork,
  deleteNetwork,
  getNetworks,
  getSpecificNetwork,
} from "../controllers/networks-controller.js";
import { authenticateToken } from "../middlewares/authentication-middleware.js";

const networksRouter = Router();

networksRouter
  .get("/", authenticateToken, getNetworks)
  .get("/:id", authenticateToken, getSpecificNetwork)
  .post("/", authenticateToken, createNetwork)
  .delete("/:id", authenticateToken, deleteNetwork);

export default networksRouter;
