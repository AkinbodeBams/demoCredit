import { Knex } from "knex";
import path from "path";
import { envStore } from "../envStore";

console.log(path.resolve(__dirname, "migrations"));

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
      tableName: "knex_migrations",
      directory: path.resolve(__dirname, "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "seeds"),
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
      tableName: "knex_migrations",
      directory: path.resolve(__dirname, "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "seeds"),
    },
  },
};

export default knexConfig;
