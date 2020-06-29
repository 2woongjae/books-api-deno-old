import { Client } from "https://deno.land/x/mysql/mod.ts";
import { connectionOptions } from "../nessie.config.ts";

const client = await new Client().connect(connectionOptions);

export default client;
