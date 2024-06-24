import { EnvStore } from "./types";

const envStore: EnvStore = {
  DB_HOST: "127.0.0.1",
  DB_PORT: "3306",
  DB_USERNAME: "root",
  DB_PASSWORD: "icui4cu4u",
  DB_NAME: "demo_credit",
  APP_ENV: "development",
};

const setEnvStoreFromEnvironment = () => {
  (Object.keys(envStore) as Array<keyof EnvStore>).forEach((envVar) => {
    const envValue = process.env[envVar];

    if (envValue) {
      if (
        envVar === "APP_ENV" &&
        (envValue === "development" || envValue === "production")
      ) {
        envStore[envVar] = envValue as "development" | "production";
      } else if (envVar !== "APP_ENV") {
        envStore[envVar] = envValue;
      }
    }
  });

  if (envStore.APP_ENV !== "development" && envStore.APP_ENV !== "production") {
    console.error(
      `Invalid APP_ENV value: ${envStore.APP_ENV}. Expected "development" or "production".`
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
