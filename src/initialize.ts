import dotenv from "dotenv";
import app from "./app";
import { initializeDatabase } from "./database";
import { configureEnv } from "./envStore";
import { setupApp } from "./reusables";

dotenv.config();

const initialize = async (callback: () => void | Promise<void>) => {
  try {
    await configureEnv();
    await initializeDatabase();
    await setupApp(app);
    await callback();
  } catch (error: any) {
    console.error(`Error Starting Application: ${error.message}`);
    process.exit(1);
  }
};

export default initialize;
