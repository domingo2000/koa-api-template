import Router from "@koa/router";

const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = {
    "message": "Hello world!"
  }
});

router.post('/', (ctx, next) => {
  const { message } = ctx.request.body;
  ctx.body = `hello: message: ${message}`
})

export { router };
