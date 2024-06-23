// src/database/index.ts
import Knex, { Knex as KnexType } from "knex";
import { Model } from "objection";
import knexConfig from "./knex/knexfile";
import { envStore } from "../envStore";

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
