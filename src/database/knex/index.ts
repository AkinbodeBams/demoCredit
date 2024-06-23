// src/database/index.ts
import Knex from "knex";
import { Model } from "objection";
import knexConfig from "./knexfile";

const environment = process.env.NODE_ENV || "development";
const config = knexConfig[environment];

const knex = Knex(config);
Model.knex(knex);

export { knex };
