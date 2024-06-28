import Knex, { Knex as KnexType } from "knex";
import { Model } from "objection";
import { configureEnv, envStore } from "../envStore";
import knexConfig from "./knexfile";

export async function initializeDatabase(): Promise<KnexType> {
  await configureEnv();
  const config = knexConfig[process.env.NODE_ENV as string];
  const knex = Knex(config);
  Model.knex(knex);

  return knex
    .raw("select 1+1 as result")
    .then(() => {
      return knex;
    })
    .catch((error) => {
      console.error("Failed to establish database connection:", error);
      process.exit(1);
    });
}
