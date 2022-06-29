import supertest from "supertest";
import { app } from "../app";

const request = supertest(app.callback());

describe("GET /example", () => {
  let response: supertest.Response;
  beforeAll(async () => {
    response = await request.get("/examples");
  });

  test("should get correct status code", () => {
    expect(response.status).toBe(200);
  });

  test("should give the correct information", () => {
    expect(response.body).toEqual({ message: "example route GET /example" });
  });
});

describe("GET /example", () => {
  let response: supertest.Response;
  beforeAll(async () => {
    response = await request.post("/examples").send({
      message: "hola",
    });
  });

  test("should get correct status code", () => {
    expect(response.status).toBe(201);
  });

  test("should give the correct information", () => {
    expect(response.body).toEqual({ message: "example route POST /example" });
  });
});

describe("PUT /example", () => {
  let response: supertest.Response;
  beforeAll(async () => {
    response = await request.put("/examples").send({
      message: "hola",
    });
  });

  test("should get correct status code", () => {
    expect(response.status).toBe(200);
  });

  test("should give the correct information", () => {
    expect(response.body).toEqual({ message: "example route PUT /example" });
  });
});

describe("DELETE /example", () => {
  let response: supertest.Response;
  beforeAll(async () => {
    response = await request.del("/examples");
  });

  test("should get correct status code", () => {
    expect(response.status).toBe(204);
  });
});
