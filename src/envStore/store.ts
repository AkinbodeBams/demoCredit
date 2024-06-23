import { EnvStore } from "./types";

const envStore: EnvStore = {
  DB_HOST: "127.0.0.1",
  DB_PORT: "5432",
  DB_USERNAME: "postgres",
  DB_PASSWORD: "",
  DB_NAME: "demoCredit",
};

const setEnvStoreFromEnvironment = () => {
  (Object.keys(envStore) as Array<keyof EnvStore>).forEach((envVar) => {
    if (process.env[envVar]) {
      envStore[envVar] = process.env[envVar] || "";
    }
  });
};

export const configureEnv = async (): Promise<void> => {
  setEnvStoreFromEnvironment();
  const emptyDataResults = Object.keys(envStore).filter(
    (envVar: string) => envStore[envVar as keyof EnvStore] === ""
  );
  if (emptyDataResults.length > 0) {
    console.error(`Missing data in environment ${emptyDataResults.join(", ")}`);
    process.exit(1);
  }
};

export default envStore;
