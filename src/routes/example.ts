import Router from "@koa/router";

const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = {
    message: "example route GET /example",
  };
});

router.post("/", (ctx, next) => {
  ctx.body = {
    message: "example route POS /example",
  };
  ctx.status = 201;
});

router.put("/", (ctx, next) => {
  ctx.body = {
    message: "example route PUT /example",
  };
  ctx.status = 200;
});

router.del("/", (ctx, next) => {
  ctx.status = 204;
});

export { router };
