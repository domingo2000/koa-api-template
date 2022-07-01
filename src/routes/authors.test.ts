import supertest from "supertest";
import { app } from "../app";
import Author from "../entities/Author";
import { authorMemoryRepository as authorRepository } from "../repositories/AuthorMemoryRepository";

const request = supertest(app.callback());

describe("ANY /authors/:idAuthor", () => {
  let response: supertest.Response;
  describe("when author does not exists", () => {
    test("GET should give 404", async () => {
      response = await request.get("/authors/-1");
      expect(response.status).toBe(404);
    });

    test("PUT should give 404", async () => {
      response = await request.get("/authors/-1");
      expect(response.status).toBe(404);
    });

    test("DELETE should give 404", async () => {
      response = await request.get("/authors/-1");
      expect(response.status).toBe(404);
    });
  });
});

describe("GET /authors", () => {
  let response: supertest.Response;

  let author1: Author;
  let author2: Author;
  beforeAll(async () => {
    await authorRepository.clean();

    author1 = new Author("J.K", "Rowling");
    author2 = new Author("C.S.", "Lewis");

    await authorRepository.save(author1);
    await authorRepository.save(author2);

    response = await request.get("/authors");
  });

  test("should get correct status code", () => {
    expect(response.status).toBe(200);
  });

  test("should give the correct information", () => {
    expect(response.body).toEqual([
      {
        id: author1.id,
        name: author1.name,
        lastname: author1.lastname,
      },
      {
        id: author2.id,
        name: author2.name,
        lastname: author2.lastname,
      },
    ]);
  });
});

describe("GET /authors/:idAuthor", () => {
  let response: supertest.Response;

  let author: Author;
  beforeAll(async () => {
    await authorRepository.clean();

    author = new Author("J.K.", "Rowling");
    await authorRepository.save(author);

    response = await request.get(`/authors/${author.id}`);
  });

  test("should get correct status code", () => {
    expect(response.status).toBe(200);
  });

  test("should give the correct information", () => {
    expect(response.body).toEqual({
      id: author.id,
      name: author.name,
      lastname: author.lastname,
    });
  });
});

describe("POST /authors", () => {
  let response: supertest.Response;
  let body: any;
  beforeAll(async () => {
    await authorRepository.clean();

    body = {
      name: "Rick",
      lastname: "Riordan",
    };

    response = await request.post("/authors").send(body);
  });

  test("should get correct status code", () => {
    expect(response.status).toBe(201);
  });

  test("should give the correct information", () => {
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe(body.name);
    expect(response.body.lastname).toBe(body.lastname);
  });
});

describe("PUT /authors/:authorId", () => {
  let response: supertest.Response;
  let body: any;
  let author: Author;
  beforeAll(async () => {
    authorRepository.clean();
    author = new Author("Susane", "Colins");
    await authorRepository.save(author);

    body = {
      name: "Sussanne",
      lastname: "Collins",
    };

    response = await request.put(`/authors/${author.id}`).send(body);
  });

  test("should get correct status code", () => {
    expect(response.status).toBe(200);
  });

  test("should give the correct information", () => {
    expect(response.body.id).toBe(author.id);
    expect(response.body.name).toBe(body.name);
    expect(response.body.lastname).toBe(body.lastname);
  });
});

describe("DELETE /authors/:idAuthor", () => {
  let response: supertest.Response;
  let author: Author;
  beforeAll(async () => {
    await authorRepository.clean();
    author = new Author("J.K.", "Rowling");
    await authorRepository.save(author);

    response = await request.del(`/authors/${author.id}`);
  });

  test("should get correct status code", () => {
    expect(response.status).toBe(204);
  });

  test("should delete the author", async () => {
    const author_ = await authorRepository.findById(author.id as number);
    expect(author_).toBeNull();
  });
});
