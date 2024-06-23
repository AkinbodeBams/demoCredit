import { Application } from "express";

export const setupApp = async (app: Application) => {
  const router = (await import("../routes")).default;
  const { errorHandler } = await import("../lib/errorHandler");
  app.use(router);
  app.use(errorHandler);
};
