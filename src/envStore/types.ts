export interface EnvStore {
  DB_HOST: string;
  DB_PORT: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  APP_ENV: "dev" | "production";
}
