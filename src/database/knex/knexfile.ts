import { Knex } from "knex";
import path from "path";
import { envStore } from "../../envStore";

const knexConfig: { [key: string]: Knex.Config } = {
  dev: {
    client: "mysql2",
    connection: {
      host: envStore.DB_HOST,
      user: envStore.DB_USERNAME,
      password: envStore.DB_PASSWORD,
      database: envStore.DB_NAME,
    },
    pool: { min: 0, max: 7 },
    migrations: {
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
      directory: path.resolve(__dirname, "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "seeds"),
    },
  },
};

export default knexConfig;
