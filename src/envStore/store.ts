import { EnvStore } from "./types";


const envStore: EnvStore = {
  DB_HOST: "127.0.0.1",
  DB_PORT: "5432",
  DB_USERNAME: "postgres",
  DB_PASSWORD: "",
  DB_NAME: "demoCredit",
  appEnvironment: "dev",
};


const setEnvStoreFromEnvironment = () => {
  (Object.keys(envStore) as Array<keyof EnvStore>).forEach((envVar) => {
    const envValue = process.env[envVar];
    if (envValue) {
      if (envVar === "appEnvironment" && (envValue === "dev" || envValue === "production")) {
        envStore[envVar] = envValue as "dev" | "production";
      } else if (envVar !== "appEnvironment") {
        envStore[envVar] = envValue;
      }
    }
  });


  if (envStore.appEnvironment !== "dev" && envStore.appEnvironment !== "production") {
    console.error(`Invalid appEnvironment value: ${envStore.appEnvironment}. Expected "dev" or "production".`);
    process.exit(1); 
  }
};


const validateEnvStore = () => {
  const missingEnvVars = Object.keys(envStore).filter((envVar) => envStore[envVar as keyof EnvStore] === "");
  if (missingEnvVars.length > 0) {
    console.error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
    process.exit(1); 
  }
};


export const configureEnv = async (): Promise<void> => {
  setEnvStoreFromEnvironment();
  validateEnvStore();
};


export default envStore;
