import { EnvStore } from "./types";
import dotenv from "dotenv";
dotenv.config();

const envStore: EnvStore = {
  DB_HOST: process.env.DB_HOST || "",
  DB_USERNAME: process.env.DB_USERNAME || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "",
  DB_PORT: process.env.DB_PORT || "",
  // REDIS_URL: process.env.REDIS_URL || '',
  NODE_ENV: process.env.NODE_ENV as "development" | "production" | "test",
  adjutorApi: process.env.adjutorApi || "",
};

const setEnvStoreFromEnvironment = () => {
  (Object.keys(envStore) as Array<keyof EnvStore>).forEach((envVar) => {
    const envValue = process.env[envVar];

    if (envValue) {
      if (
        envVar === "NODE_ENV" &&
        (envValue === "development" || envValue === "production")
      ) {
        envStore[envVar] = envValue as "development" | "production";
      } else if (envVar !== "NODE_ENV") {
        envStore[envVar] = envValue;
      }
    }
  });

  if (
    envStore.NODE_ENV !== "development" &&
    envStore.NODE_ENV !== "production"
  ) {
    console.error(
      `Invalid NODE_ENV value: ${envStore.NODE_ENV}. Expected "development" or "production".`
    );
    process.exit(1);
  }
};

const validateEnvStore = () => {
  const missingEnvVars = Object.keys(envStore).filter(
    (envVar) => envStore[envVar as keyof EnvStore] === ""
  );
  if (missingEnvVars.length > 0) {
    console.error(
      `Missing required environment variables: ${missingEnvVars.join(", ")}`
    );
    process.exit(1);
  }
};

export const configureEnv = async (): Promise<void> => {
  setEnvStoreFromEnvironment();
  validateEnvStore();
};

export default envStore;
