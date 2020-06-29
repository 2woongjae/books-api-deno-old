import { Migration } from "https://deno.land/x/nessie/mod.ts";
import { Schema } from "https://deno.land/x/nessie/qb.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

/** Runs on migrate */
export const up: Migration<Schema> = async ({ queryBuilder }) => {
  queryBuilder.create("Users", (table) => {
    table.string("userId", 36).primary().notNullable();
    table.string("name", 255).notNullable();
    table.string("email", 255).notNullable();
    table.string("password", 255).notNullable();
    table.timestamps();
  });

  const uuid = v4.generate();
  const name = "Mark Lee";
  const email = "2woongjae@gmail.com";
  const hashed = await bcrypt.hash("deno1234");

  queryBuilder.queryString(
    `INSERT INTO Users VALUES ('${uuid}', '${name}', '${email}', '${hashed}', DEFAULT, DEFAULT);`
  );

  return queryBuilder.query;
};

/** Runs on rollback */
export const down: Migration<Schema> = ({ queryBuilder }) => {
  return queryBuilder.drop("Users");
};
