import app from "../src/app";
import supertest from "supertest";
import { cleanDB, generateValidToken } from "./helpers";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import { createUser } from "./factories/users-factory";
import * as jwt from "jsonwebtoken";
import { createCredential } from "./factories/credentias-factory";

beforeEach(async () => await cleanDB());

const server = supertest(app);

const generateValidBody = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(10),
});

describe("GET /credentials", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/credentials");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server
      .get("/credentials")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const body = generateValidBody();
    const userWithoutSession = await createUser(body);
    const token = jwt.sign(
      { userId: userWithoutSession.id },
      process.env.JWT_SECRET
    );

    const response = await server
      .get("/credentials")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 and an empty array", async () => {
      const body = generateValidBody();
      const user = await createUser(body);
      const token = await generateValidToken(user);

      const response = await server
        .get("/credentials")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual([]);
    });

    it("should respond with status 200 and a list of credentials", async () => {
      const body = generateValidBody();
      const user = await createUser(body);
      const token = await generateValidToken(user);

      const credentials = await createCredential(user.id);

      const response = await server
        .get("/credentials")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual([credentials]);
    });
  });
});

describe("GET /credentials/:id", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/credentials/1");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server
      .get("/credentials/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const body = generateValidBody();
    const userWithoutSession = await createUser(body);
    const token = jwt.sign(
      { userId: userWithoutSession.id },
      process.env.JWT_SECRET
    );

    const response = await server
      .get("/credentials/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 400 when the credential don't exists", async () => {
      const body = generateValidBody();
      const user = await createUser(body);
      const token = await generateValidToken(user);

      const response = await server
        .get("/credentials/0")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it("should respond with status 200 and the credential", async () => {
      const body = generateValidBody();
      const user = await createUser(body);
      const token = await generateValidToken(user);
      const credential = await createCredential(user.id);

      const response = await server
        .get(`/credentials/${credential.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual(credential);
    });
  });
});

describe("POST /credentials", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/credentials");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server
      .post("/credentials")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const body = generateValidBody();
    const userWithoutSession = await createUser(body);
    const token = jwt.sign(
      { userId: userWithoutSession.id },
      process.env.JWT_SECRET
    );

    const response = await server
      .post("/credentials")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 409 when the title already exists", async () => {
      const body = generateValidBody();
      const user = await createUser(body);
      const token = await generateValidToken(user);
      const credential = await createCredential(user.id);

      const data = {
        title: credential.title,
        url: faker.datatype.string(),
        username: faker.datatype.string(),
        password: faker.datatype.string(),
      };

      const response = await server
        .post("/credentials")
        .set("Authorization", `Bearer ${token}`)
        .send(data);

      expect(response.status).toEqual(httpStatus.CONFLICT);
    });

    it("should respond with status 200 when the credential is created", async () => {
      const body = generateValidBody();
      const user = await createUser(body);
      const token = await generateValidToken(user);

      const data = {
        title: faker.datatype.string(),
        url: faker.datatype.string(),
        username: faker.datatype.string(),
        password: faker.datatype.string(),
      };

      const response = await server
        .post("/credentials")
        .set("Authorization", `Bearer ${token}`)
        .send(data);

      expect(response.status).toEqual(httpStatus.OK);
    });
  });
});

describe("DELETE /credentials/:id", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.delete("/credentials/1");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server
      .delete("/credentials/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const body = generateValidBody();
    const userWithoutSession = await createUser(body);
    const token = jwt.sign(
      { userId: userWithoutSession.id },
      process.env.JWT_SECRET
    );

    const response = await server
      .delete("/credentials/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 400 when the credential don't exists", async () => {
      const body = generateValidBody();
      const user = await createUser(body);
      const token = await generateValidToken(user);

      const response = await server
        .delete("/credentials/0")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it("should responde with status 200 when the credential is deleted", async () => {
      const body = generateValidBody();
      const user = await createUser(body);
      const token = await generateValidToken(user);
      const credential = await createCredential(user.id);

      const response = await server
        .delete(`/credentials/${credential.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
    });
  });
});
