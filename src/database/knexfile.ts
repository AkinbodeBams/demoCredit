import "dotenv/config";
import { Knex } from "knex";
import path from "path";

const connection = {
  host: process.env.NODE_ENV === "production" ? "db" : "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection,
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
    connection,
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
