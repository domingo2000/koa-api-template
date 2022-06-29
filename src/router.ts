import Router from "@koa/router";
import { router as exampleRouter } from "./routes/example";

const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = {
    message: "Hello world!",
  };
});

router.post("/", (ctx, next) => {
  const { message } = ctx.request.body;
  ctx.body = `hello: message: ${message}`;
});

router.use("/examples", exampleRouter.routes());

export { router };
