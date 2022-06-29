import Koa from "koa";
import koaBody from "koa-body";
import logger from "koa-logger";
import { router } from "./router";

const PORT = process.env.PORT || 3000;

const app = new Koa();

app.use(logger());

// Middlewares
app.use(
  koaBody({
    // The next configuration embrace security by only accepting JSON data
    // multipart: false,
    // urlencoded: false,
    // text: false,
    // json: true,
  })
);

// Router configuration
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log("App listening in port", PORT);
});
