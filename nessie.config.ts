import { ClientMySQL } from "https://deno.land/x/nessie/mod.ts";

/** These are the default config options. */
const clientOptions = {
  migrationFolder: "./db/migrations",
  seedFolder: "./db/seeds",
};

export const connectionOptions = {
  hostname: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  db: "books-api",
};

/** Select one of the supported clients */
const clientMySql = new ClientMySQL(clientOptions, connectionOptions);

/** This is the final config object */
const config = {
  client: clientMySql,
  // Defaults to false, if you want the query builder exposed in migration files, set this to true.
  exposeQueryBuilder: true,
};

export default config;
