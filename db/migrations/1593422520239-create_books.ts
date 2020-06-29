import { Migration } from "https://deno.land/x/nessie/mod.ts";
import { Schema } from "https://deno.land/x/nessie/qb.ts";

/** Runs on migrate */
export const up: Migration<Schema> = async ({ queryBuilder }) => {
  queryBuilder.create("Books", (table) => {
    table.id();
    table.string("ownerId", 36).notNullable();
    table.string("title", 255).notNullable();
    table.string("message", 255).notNullable();
    table.string("author", 255).notNullable();
    table.string("url", 255).notNullable();
    table.timestamps();
  });

  return queryBuilder.query;
};

/** Runs on rollback */
export const down: Migration<Schema> = ({ queryBuilder }) => {
  return queryBuilder.drop("Books");
};
