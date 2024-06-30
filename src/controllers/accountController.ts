import { Request, Response } from "express";
import { validate } from "../lib/validator";
import { WithdrawAccountDto, FundDto, TransferFundDto } from "../dto";
import { accountService } from "../services";
import { errorResponse, successResponse } from "../lib/httpResponse";

const fundAccount = async (req: Request, res: Response) => {
  const dto = await validate<FundDto>({ ...req.body }, FundDto);
  const response = await accountService.fundAccount(req, dto);

  if (!response.data) {
    return errorResponse({ ...response, res });
  }
  return successResponse({ res, data: response.data });
};

const withdrawFund = async (req: Request, res: Response) => {
  const dto = await validate<WithdrawAccountDto>(
    { ...req.body },
    WithdrawAccountDto
  );

  const response = await accountService.withdrawFund(req, dto);

  if (!response.data) {
    return errorResponse({ ...response, res });
  }
  return successResponse({ res, data: response.data });
};

const transferFund = async (req: Request, res: Response) => {
  const dto = await validate<TransferFundDto>({ ...req.body }, TransferFundDto);
  const response = await accountService.transferFund(req, dto);

  if (!response.data) {
    return errorResponse({ ...response, res });
  }
  return successResponse({ res, data: response.data });
};

export default { fundAccount, withdrawFund, transferFund };
