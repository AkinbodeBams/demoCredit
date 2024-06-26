import { Request } from "express";
import { userDao } from "../database/dao";

export function generateToken(bvn: string): string {
  const expirationEpoch = Date.now() + 20 * 60 * 1000;
  return `${bvn}-${expirationEpoch}`;
}
