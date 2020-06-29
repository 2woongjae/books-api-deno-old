import { Context } from "https://raw.githubusercontent.com/oakserver/oak/main/mod.ts";

export default function notFound(context: Context) {
  context.response.status = 404;
  context.response.body = { error: "Not Found" };
}
