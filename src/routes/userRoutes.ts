import { Request, Response, Router } from "express";
import { httpErrors } from "../lib/errorHandler";

const router = Router();
router.all("*", (req: Request, res: Response) => {
  throw new httpErrors.NotFoundError(
    `Can't find route [ ${req.method} ${req.originalUrl} ] on this server`
  );
});

export default router;
