import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ObjectSchema } from "joi";
import { createUserSchema } from "../schemas/users-schemas";
import { signInSchema } from "../schemas/authentication-schemas";

export function validateBody(req: Request, res: Response, next: NextFunction) {
  const user = req.body;

  const { error } = createUserSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((d) => d.message);
    return res.status(400).send(errors);
  }

  next()
}

export function validateBodySignIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.body;

  const { error } = signInSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((d) => d.message);
    return res.status(400).send(errors);
  }

  next()
}

// export function validateBody<T>(schema: ObjectSchema<T>): ValidationMiddleware {
//   return validate(schema, "body");
// }

// function validate(schema: ObjectSchema, type: "body" | "params") {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const { error } = schema.validate(req[type], {
//       abortEarly: false,
//     });

//     if (!error) {
//       next();
//     } else {
//       res.status(httpStatus.BAD_REQUEST);
//     }
//   };
// }

type ValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
