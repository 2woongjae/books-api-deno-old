import { RouterContext } from "https://raw.githubusercontent.com/oakserver/oak/main/mod.ts";
import { UnauthorizedError } from "./errors.ts";
import { validate } from "./token.ts";

export async function getUserIdFromAuthorization(
  context: RouterContext
): Promise<string> {
  const authorization = context.request.headers.get("authorization");

  if (authorization === null) {
    throw new UnauthorizedError();
  }

  const token = authorization.replace("Bearer ", "");
  const validation = await validate(token);

  if (!validation.isValid) {
    throw new UnauthorizedError();
  }

  const userId = validation.payload?.userId as string;

  if (userId === undefined) {
    throw new UnauthorizedError();
  }

  return userId;
}
