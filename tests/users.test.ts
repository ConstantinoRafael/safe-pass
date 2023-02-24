import httpStatus from "http-status";
import supertest from "supertest";
import app from "../src/app";
import { cleanDB } from "./helpers";
import { faker } from "@faker-js/faker";
import { createUser } from "./factories/users-factory";
import prisma from "../src/config/database";

beforeEach(async () => await cleanDB());

const server = supertest(app);

describe("POST /users", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/users");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { email: "papapapapapa" };

    const response = await server.post("/users").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(10),
    });

    it("should responde with status 409 there is an user with given email", async () => {
      const body = generateValidBody();
      await createUser(body);

      const response = await server.post("/users").send(body);

      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it("should respond with status 201 and create user when given email is unique", async () => {
      const body = generateValidBody();

      const response = await server.post("/users").send(body);

      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        email: body.email,
      });
    });

    it("should save user on db", async () => {
      const body = generateValidBody();

      const response = await server.post("/users").send(body);

      const user = await prisma.user.findUnique({
        where: { email: body.email },
      });
      expect(user).toEqual(
        expect.objectContaining({
          id: response.body.id,
          email: body.email,
        })
      );
    });
  });
});
