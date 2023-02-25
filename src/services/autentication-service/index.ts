import userRepository from "../../repositories/user-respository/index";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { exclude } from "../../utils/prisma-util";
import sessionRepository from "../../repositories/session-repository/index";

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw { message: "user not found" };
  }

  const userId = user.id;

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw { message: "Email or password incorrect" };

  const token = jwt.sign({ userId }, `${process.env.JWT_SECRET}`);

  // const user = await getUserOrFail(email);

  // await validatePasswordOrFail(password, user.password);

  // const token = await createSession(user.id);

  return {
    user: exclude(user, "password"),
    token,
  };
}

// async function getUserOrFail(email: string) {
//   const user = await userRepository.findByEmail(email);
//   if (!user) throw { message: "Email or password incorrect 1" };

//   return user;
// }

// async function createSession(userId: number) {
//   const token = jwt.sign({ userId }, `${process.env.JWT_SECRET}`);
//   await sessionRepository.create({
//     token,
//     userId,
//   });

//   return token;
// }

// async function validatePasswordOrFail(password: string, userPassword: string) {
//   const isPasswordValid = await bcrypt.compare(password, userPassword);

//   if (!isPasswordValid) throw { message: "Email or password incorrect 2" };
// }

export type SignInParams = Pick<User, "email" | "password">;

type SignInResult = {
  user: Pick<User, "id" | "email">;
  token: string;
};

// type GetUserOrFailResult = Pick<User, "id" | "email" | "password">;

const authenticationService = {
  signIn,
};

export default authenticationService;
