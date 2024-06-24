import { Request, Response } from "express";
import { validate } from "../lib/validator";
import { FundAccountDto } from "../dto";
import { accountService } from "../services";
import { errorResponse, successResponse } from "../lib/httpResponse";

const fundAccount = async (req: Request, res: Response) => {
  const dto = await validate<FundAccountDto>({ ...req.body }, FundAccountDto);
  const response = await accountService.fundAccount(dto);

  if (!response.data) {
    return errorResponse({ ...response, res });
  }
  return successResponse({ res, data: response.data });
};

const withdrawFund = async (req: Request, res: Response) => {
  const dto = await validate<FundAccountDto>({ ...req.body }, FundAccountDto);
  const response = await accountService.fundAccount(dto);

  if (!response.data) {
    return errorResponse({ ...response, res });
  }
  return successResponse({ res, data: response.data });
};

export default { fundAccount };
