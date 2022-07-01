import Router from "@koa/router";
import Author from "../entities/Author";
import { AuthorJSONEncoder } from "../encoders/AuthorJSONEncoder";
import { authorMemoryRepository as authorRepository } from "../repositories/AuthorMemoryRepository";

const router = new Router();

router.param("authorId", async (authorId, ctx, next) => {
  const author = await authorRepository.findById(parseInt(authorId));
  author ? (ctx.author = author) : ctx.throw(404, "Author not found");
  return next();
});

router.get("/", async (ctx, next) => {
  const authors = await authorRepository.findAll();
  ctx.body = authors.map((author) => AuthorJSONEncoder.encode(author));
});

router.get("/:authorId", async (ctx, next) => {
  ctx.body = AuthorJSONEncoder.encode(ctx.author);
});

router.post("/", async (ctx, next) => {
  const author = new Author(ctx.request.body.name, ctx.request.body.lastname);
  await authorRepository.save(author);
  ctx.status = 201;
  ctx.body = AuthorJSONEncoder.encode(author);
});

router.put("/:authorId", async (ctx, next) => {
  if (ctx.request.body.name) {
    ctx.author.name = ctx.request.body.name;
  }
  if (ctx.request.body.lastname) {
    ctx.author.lastname = ctx.request.body.lastname;
  }
  ctx.body = AuthorJSONEncoder.encode(ctx.author);
});

router.del("/:authorId", async (ctx, next) => {
  await authorRepository.delete(ctx.author);
  ctx.status = 204;
});

export { router };
