import app from "../src/app";
import supertest from "supertest";
import { cleanDB } from "./helpers";


beforeEach(async () => await cleanDB());

const server = supertest(app);