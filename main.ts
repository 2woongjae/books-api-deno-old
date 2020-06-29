import { config } from "https://raw.githubusercontent.com/pietvanzoen/deno-dotenv/master/mod.ts";
import { Application } from "https://raw.githubusercontent.com/oakserver/oak/main/mod.ts";
import router from "./routes.ts";
import notFound from "./not_found.ts";

const env = config();
const port = Number(env.PORT) || 4000;

const app = new Application();

app.use(async (context, next) => {
  try {
    await next();
  } catch (error) {
    context.response.status = error.status || 400;
    context.response.body = { error: error.message };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(notFound);

await app.listen({ port });
