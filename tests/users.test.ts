import httpStatus from "http-status";
import supertest from "supertest";
import app from "../src/app";
import { cleanDB } from "./helpers";

beforeEach(async () => await cleanDB());

const server = supertest(app);

describe("POST /users", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/users");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
});
