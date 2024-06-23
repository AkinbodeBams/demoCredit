import { EnvStore } from "./types";

const envStore: EnvStore = {
  DB_HOST: "127.0.0.1",
  DB_PORT: "3306",
  DB_USERNAME: process.env.DB_USERNAME || "",
  DB_PASSWORD: process.env.DB_USERNAME || "",
  DB_NAME: "demoCredit",
  APP_ENV: "dev",
};

const setEnvStoreFromEnvironment = () => {
  (Object.keys(envStore) as Array<keyof EnvStore>).forEach((envVar) => {
    const envValue = process.env[envVar];
    console.log(envValue);

    if (envValue) {
      if (
        envVar === "APP_ENV" &&
        (envValue === "dev" || envValue === "production")
      ) {
        envStore[envVar] = envValue as "dev" | "production";
      } else if (envVar !== "APP_ENV") {
        envStore[envVar] = envValue;
      }
    }
  });

  if (envStore.APP_ENV !== "dev" && envStore.APP_ENV !== "production") {
    console.error(
      `Invalid APP_ENV value: ${envStore.APP_ENV}. Expected "dev" or "production".`
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
