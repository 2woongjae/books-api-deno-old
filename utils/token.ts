import {
  makeJwt,
  setExpiration,
  Jose,
} from "https://deno.land/x/djwt/create.ts";
import {
  validateJwt,
  JwtValidation,
} from "https://deno.land/x/djwt/validate.ts";
import { User } from "../models/Users.ts";

const key = "markzzang";

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export function generate(user: User): string {
  return makeJwt({
    header,
    payload: {
      iss: "mark",
      exp: setExpiration(new Date().getTime() + 600000),
      userId: user.userId,
      email: user.email,
    },
    key,
  });
}

export async function validate(token: string): Promise<JwtValidation> {
  return await validateJwt(token, key);
}
