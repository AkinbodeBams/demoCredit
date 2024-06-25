import { transaction } from "objection";
import { accountDao } from "../database/dao";
import { Account } from "../database/models";
import {
  CreateAccountDto,
  FundAndWithdrawAccountDto,
  TransferFundDto,
} from "../dto";
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
  return await transaction(Account.knex(), async (trx) => {
    const account = await accountDao.getAccountByAccountNumber(
      accountNumber,
      trx
    );
    if (!account) {
      throw new httpErrors.NotFoundError(
        `${errMsg.FUND_ERROR}: ${errMsg.ACCOUNT_NOT_FOUND}`
      );
    }
    const newBalance = Number(account.balance) + amount;

    const updatedAccount = await account
      .$query(trx)
      .patchAndFetch({ balance: newBalance });
    return {
      data: { balance: updatedAccount.balance, userId: updatedAccount.userId },
    };
  });
};

const withdrawFund = async (dto: FundAndWithdrawAccountDto): Promise<any> => {
  const { accountNumber, amount } = dto;
  try {
  } catch (error) {}
  const res = await transaction(Account.knex(), async (trx) => {
    const account = await accountDao.getAccountByAccountNumber(
      accountNumber,
      trx
    );
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

    const updatedAccount = await account
      .$query(trx)
      .patchAndFetch({ balance: newBalance });
    return {
      data: { balance: updatedAccount.balance, userId: updatedAccount.userId },
    };
  });
};

// const transferFund = async (dto: TransferFundDto): Promise<any> => {
//   const { sender, recipient, amount } = dto;
//   try {
//   } catch (error) {}

//   const res = await transaction(Account.knex(), async (trx) => {
//     const fromAccount = await accountDao.getAccountByAccountNumber(sender, trx);
//     if (!fromAccount) {
//       throw new httpErrors.NotFoundError(
//         `${errMsg.TRANSFER_ERROR}: ${errMsg.ACCOUNT_NOT_FOUND}`
//       );
//     }
//   });
// };
export default { createAccount, fundAccount, withdrawFund };
