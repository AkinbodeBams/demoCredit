import { configureEnv } from "./envStore";

const initialize = async (body: (() => void) | (() => Promise<void>)) => {
  try {
    await configureEnv();
    body();
  } catch (error: any) {
    console.error(`Error Starting Application: ${error.message}`);
    process.exit(1);
  }
};

export default initialize;
