import type { Knex } from "knex";
import dotenv from "dotenv";
import envStore from "../envStore/store";

dotenv.config();

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      host: envStore.DB_HOST,
      user: envStore.DB_USERNAME,
      password: envStore.DB_PASSWORD,
      database: envStore.DB_NAME,
    },
    pool: { min: 0, max: 7 },
    migrations: {
      directory: "./src/database/migrations",
    },
    seeds: {
      directory: "./src/database/seeds",
    },
  },
  production: {
    client: "mysql2",
    connection: {
      host: envStore.DB_HOST,
      user: envStore.DB_USERNAME,
      password: envStore.DB_PASSWORD,
      database: envStore.DB_NAME,
    },
    pool: { min: 0, max: 7 },
    migrations: {
      directory: "./src/database/migrations",
    },
    seeds: {
      directory: "./src/database/seeds",
    },
  },
};

export default knexConfig;
