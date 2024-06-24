import { accountDao } from "../database/dao";
import { Account } from "../database/models";
import { CreateAccountDto } from "../dto";
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

export default { createAccount };
