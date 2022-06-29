import Koa from "koa";
import koaBody from "koa-body";
import KoaLogger from "koa-logger";
import { router } from "./routes"

const PORT = process.env.PORT || 3000;

const app = new Koa();

app.use(KoaLogger());

// Middlewares
app.use(koaBody({
  // The next configuration embrace security by only accepting JSON data
  // multipart: false,
  // urlencoded: false,
  // text: false,
  // json: true,
}));

// Router configuration
app.use(router.routes());
app.use(router.allowedMethods());


app.listen(PORT, () => {
  console.log("App listening in port", PORT)
})