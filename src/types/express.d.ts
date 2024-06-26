import { SessionData } from "../lib/middlewares";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}
