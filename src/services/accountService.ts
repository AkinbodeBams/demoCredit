import { accountDao } from "../database/dao";
import { Account } from "../database/models";
import { CreateAccountDto, FundAndWithdrawAccountDto } from "../dto";
import { errorResponseMessage as errMsg, httpErrors } from "../lib";

const createAccount = async (dto: CreateAccountDto): Promise<Account> => {
  try {
    return await accountDao.createAccount({
      userId: dto.userId,
      accountNumber: dto.accountNumber,
      isActive: true,
    });
  } catch (error) {
    throw new httpErrors.InternalServerError(
      errMsg.DEFAULT + ":" + error.message
    );
  }
};

const fundAccount = async (dto: FundAndWithdrawAccountDto): Promise<any> => {
  const { accountNumber, amount } = dto;

  const account = await accountDao.getAccountByAccountNumber(accountNumber);
  if (!account) {
    throw new httpErrors.NotFoundError(
      `${errMsg.FUND_ERROR}: ${errMsg.ACCOUNT_NOT_FOUND}`
    );
  }
  const newBalance = Number(account.balance) + amount;
  const data = await accountDao.updateAccount(account, {
    balance: newBalance,
  });
  return { data };
};

const withdrawFund = async (dto: FundAndWithdrawAccountDto): Promise<any> => {
  const { accountNumber, amount } = dto;

  const account = await accountDao.getAccountByAccountNumber(accountNumber);
  if (!account) {
    throw new httpErrors.NotFoundError(
      `${errMsg.WITHDRAW_ERROR}: ${errMsg.ACCOUNT_NOT_FOUND}`
    );
  }
  if (account.balance < amount) {
    throw new httpErrors.InsufficientBalanceError(
      `${errMsg.WITHDRAW_ERROR}: ${errMsg.INSUFFICIENT_BALANCE_ERROR}`
    );
  }
  const newBalance = Number(account.balance) - amount;
  const data = await accountDao.updateAccount(account, {
    balance: newBalance,
  });
  return { data };
};

export default { createAccount, fundAccount, withdrawFund };
