import { Response, Request, NextFunction } from "express";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";

type TokenPayload = {
  userId: string;
  iat: number;
  exp: number;
};

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ error: "Token not provided" });
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

    const { userId } = decoded as TokenPayload;

    req.userId = userId;

    return next();
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json({ error: "Token invalid" });
  }
}

// export async function authenticateToken(
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) {
//   const authHeader = req.header("Authorization");
//   if (!authHeader) {
//     return generateUnauthorizedResponse(res);
//   }

//   const token = authHeader.split(" ")[1];
//   if (!token) {
//     return generateUnauthorizedResponse(res);
//   }

//   try {
//     const { userId } = jwt.verify(token, `${process.env.JWT_SECRET}`) as JWTPayload;

//     const session = await prisma.session.findFirst({
//       where: {
//         token,
//       },
//     });

//     if (!session) {
//       return generateUnauthorizedResponse(res);
//     }

//     req.userId = userId;

//     next();
//   } catch (error) {
//     return generateUnauthorizedResponse(res);
//   }
// }

// function generateUnauthorizedResponse(res: Response) {
//   return res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
// }

// export type AuthenticatedRequest = Request & JWTPayload;

// type JWTPayload = {
//   userId: number;
// };
