export interface EnvStore {
  DB_HOST: string;
  DB_PORT: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  NODE_ENV: "development" | "production" | "test";
  adjutorApi: string;
}
