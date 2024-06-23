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
  } catch (error: any) {
    console.error(`Error Starting Application: ${error.message}`);
    process.exit(1);
  }
};

export default initialize;
