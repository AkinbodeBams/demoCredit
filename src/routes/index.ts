import { Request, Response, Router } from "express";

import { httpErrors } from "../lib/errorHandler";
import { applicationMessages, successResponse } from "../lib/httpResponse";
import userRouter from "./userRoutes";

const router = Router();
router.get("/", (req: Request, res: Response) =>
  res.status(200).send("200 OK")
);
router.get("/health-status", (req: Request, res: Response) => {
  return successResponse({
    res,
    data: {
      message: applicationMessages.HEALTH_CHECK_MESSAGE,
    },
  });
});

router.use("/user", userRouter);

router.all("*", (req: Request, res: Response) => {
  throw new httpErrors.NotFoundError(
    `Can't find route [ ${req.method} ${req.originalUrl} ] on this server`
  );
});

export default router;
