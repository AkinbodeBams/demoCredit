import { User } from "../database/models";
import { SessionData } from "../lib/middlewares";

declare module "express-serve-static-core" {
  interface Request {
    user?: Partial<User>;
  }
}
