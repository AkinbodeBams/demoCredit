import { accountDao } from "../database/dao";
import { Account } from "../database/models";
import { CreateAccountDto, FundAccountDto } from "../dto";
import { httpErrors } from "../lib/errorHandler";

const createAccount = async (dto: CreateAccountDto): Promise<Account> => {
  try {
    return await accountDao.createAccount({
      userId: dto.userId,
      accountNumber: dto.accountNumber,
      isActive: true,
    });
  } catch (error) {
    throw new httpErrors.InternalServerError(
      "Error creating account: " + error.message
    );
  }
};

const fundAccount = async (dto: FundAccountDto): Promise<any> => {
  const { accountNumber, amount } = dto;
  try {
    const account = await accountDao.getAccountByAccountNumber(accountNumber);
    if (!account) {
      throw new httpErrors.NotFoundError(
        "Error funding account: Account not found"
      );
    }
    const data = await accountDao.fundAccount(account, amount);
    return { data };
  } catch (error) {
    throw new httpErrors.InternalServerError(
      "Error funding account: " + error.message
    );
  }
};

export default { createAccount, fundAccount };
