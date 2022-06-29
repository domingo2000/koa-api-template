import Router from "@koa/router";

const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = {
    message: "example route GET /example",
  };
});

router.post("/", (ctx, next) => {
  ctx.body = {
    message: "example route POST /example",
  };
});

router.put("/", (ctx, next) => {
  ctx.body = {
    message: "example route PUT /example",
  };
});

router.del("/", (ctx, next) => {
  ctx.body = {
    message: "example route DELETE /example",
  };
});

export { router };
