// middleware/authMiddleware.ts
import { RequestHandler } from "express";
import { validate } from "../validator";
import { errorResponseMessage as errMsg, httpErrors } from "../../lib";
import { userDao } from "../../database/dao";
import { tokenDto } from "../../dto/authDto";

export const authToken: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization;
  const dto = await validate<tokenDto>({ token }, tokenDto);
  const splitToken = dto.token.split("-");
  const [bvn, expiry] = splitToken;
  const user = await userDao.findByBvn(bvn);

  const isExpired = Date.now() > BigInt(expiry);
  if (!user) {
    throw new httpErrors.UnauthorizedError(errMsg.TOKEN_INVALID);
  }
  if (isExpired) {
    throw new httpErrors.UnauthorizedError(errMsg.TOKEN_EXPIRED);
  }
  req.user = user;
  return next();
};
