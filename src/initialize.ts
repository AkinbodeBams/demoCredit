import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { initializeDatabase } from "./database";
import { configureEnv } from "./envStore";
import { setupApp } from "./reusables";

const initialize = async (body: (() => void) | (() => Promise<void>)) => {
  try {
    await configureEnv();
    await initializeDatabase();
    setupApp(app);
    body();
    console.log("All Connections Successful");
  } catch (error: any) {
    console.error(`Error Starting Application: ${error.message}`);
    process.exit(1);
  }
};

export default initialize;
