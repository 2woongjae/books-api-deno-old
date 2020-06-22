import { RouterContext } from "https://raw.githubusercontent.com/oakserver/oak/main/mod.ts";

export default class UserController {
  public login(context: RouterContext) {
    context.response.body = "login";
  }

  public logout(context: RouterContext) {
    context.response.body = "logout";
  }
}
