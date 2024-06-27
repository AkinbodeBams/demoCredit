import dotenv from "dotenv";
dotenv.config();
import { Knex } from "knex";
import path from "path";

const connection = {
  host: "db", // Use the service name defined in docker-compose.yml
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "mydatabase",
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
