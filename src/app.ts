import express, { json, Request, Response } from "express";
import { authenticationRouter } from "./routers/authentication-router";
import { usersRouter } from "./routers/users-touter";

const app = express();
app.use(json()); 

app.get("/health", (req: Request, res: Response) => res.send("I am alive!"));
app.use("/users", usersRouter);
app.use("/auth", authenticationRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port} 🚀`);
});

export default app;