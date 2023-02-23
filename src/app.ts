import express, { Request, Response } from "express";
import "express-async-errors";
import { authenticationRouter } from "./routers/authentication-router.js";
import credentialsRouter from "./routers/credentials-routes.js";
import networksRouter from "./routers/networks-router.js";
import { usersRouter } from "./routers/users-router.js";

const app = express();
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => res.send("I am alive!"));
app.use("/users", usersRouter);
app.use("/auth", authenticationRouter);
app.use("/credentials", credentialsRouter);
app.use("/networks", networksRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port} 🚀`);
});

export default app;
