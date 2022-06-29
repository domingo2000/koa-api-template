import supertest from "supertest";
import { app } from "./app";

const request = supertest(app.callback());

describe("GET /", () => {
  let response: supertest.Response;
  beforeAll(async () => {
    response = await request.get("/");
  });

  test("should get correct status code", () => {
    expect(response.status).toBe(200);
  });
});

describe("POST /example", () => {
  let response: supertest.Response;
  beforeAll(async () => {
    response = await request.post("/").send({
      message: "hola",
    });
  });

  test("should get correct status code", () => {
    expect(response.status).toBe(200);
  });
});
