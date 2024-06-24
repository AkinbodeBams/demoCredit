import { Request, Response } from "express";
import { validate } from "../lib/validator";
import { FundAccountDto } from "../dto";

const fundAccount = async (req: Request, res: Response) => {
  const dto = await validate<FundAccountDto>({ ...req.body }, FundAccountDto);
};

export default { fundAccount };
