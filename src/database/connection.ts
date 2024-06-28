import Knex, { Knex as KnexType } from "knex";
import { Model } from "objection";
import { configureEnv } from "../envStore";
import knexConfig from "./knexfile";
import { exec } from "child_process";
import { promisify } from "util";

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

export const runMigrations = async (): Promise<void> => {
  const execPromise = promisify(exec);
  try {
    const { stdout, stderr } = await execPromise(
      "npx knex migrate:latest --knexfile src/database/knexfile.js"
    );
    if (stdout) console.log(`Migration stdout: ${stdout}`);
    if (stderr) console.error(`Migration stderr: ${stderr}`);
  } catch (error) {
    console.error(`Migration error: ${error.message}`);
    throw error;
  }
};
