import dotenv from "dotenv";

dotenv.config();
import Knex, { Knex as KnexType } from "knex";
import { Model } from "objection";
import { envStore } from "../envStore";
import knexConfig from "./knexfile";

export function initializeDatabase(): Promise<KnexType> {
  const config = knexConfig[envStore.APP_ENV];
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
