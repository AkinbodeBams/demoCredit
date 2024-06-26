import { Request } from "express";
import { userDao } from "../database/dao";

export function generateToken(bvn: string): string {
  const expirationEpoch = Date.now() + 1 * 60 * 1000;
  return `${bvn}-${expirationEpoch}`;
}

// export function isValidUser(req: Request): boolean {
//   const reqUserId = req.userId as string;
//   const user = userDao.findById(reqUserId);
//   return;
// }
