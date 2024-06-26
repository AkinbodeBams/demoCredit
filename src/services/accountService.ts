import { transaction } from "objection";
import { accountDao } from "../database/dao";
import { Account, User } from "../database/models";
import {
  CreateAccountDto,
  FundAndWithdrawAccountDto,
  FundDto,
  TransferFundDto,
} from "../dto";
import { errorResponseMessage as errMsg, httpErrors } from "../lib";
import { Request } from "express";

const createAccount = async (dto: CreateAccountDto): Promise<Account> => {
  try {
    return await accountDao.createAccount({
      userId: dto.userId,
      accountNumber: dto.accountNumber,
      isActive: true,
    });
  } catch (error) {
    throw new httpErrors.InternalServerError(
      `${errMsg.DEFAULT}: ${error.message}`
    );
  }
};

const fundAccount = async (req: Request): Promise<any> => {
  const { amount, source } = req.body as FundDto;
  const user = req.user;
  if (!user) return;
  console.log(user);

  try {
    return transaction(Account.knex(), async (trx) => {
      const account = await accountDao.getAccountByUserId(
        user.id as string,
        trx
      );
      if (!account) {
        throw new httpErrors.NotFoundError(
          `${errMsg.FUND_ERROR}: ${errMsg.ACCOUNT_NOT_FOUND}`
        );
      }
      const newBalance = Number(account.balance) + amount;
      await account.$query(trx).patchAndFetch({ balance: newBalance });
      // const fullName = updatedAccount.f
      return {
        data: {
          message: `Account funded from ${source}, balance is now ${newBalance}`,
        },
      };
    });
  } catch (error) {
    throw new httpErrors.InternalServerError(
      `${errMsg.DEFAULT}: ${error.message}`
    );
  }
};

const withdrawFund = async (req: Request): Promise<any> => {
  const { accountNumber, amount } = req.body as FundAndWithdrawAccountDto;
  try {
    return transaction(Account.knex(), async (trx) => {
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
        data: {
          balance: updatedAccount.balance,
          userId: updatedAccount.userId,
        },
      };
    });
  } catch (error) {
    throw new httpErrors.InternalServerError(
      `${errMsg.DEFAULT}: ${error.message}`
    );
  }
};

const transferFund = async (req: Request): Promise<any> => {
  const { recipientAccountNumber, amount } = req.body as TransferFundDto;
  const sender = req.user as string;
  try {
    return transaction(Account.knex(), async (trx) => {
      const [fromAccount, toAccount] = await Promise.all([
        accountDao.getAccountByAccountNumber(sender, trx),
        accountDao.getAccountByAccountNumber(recipientAccountNumber, trx),
      ]);

      if (!fromAccount || !toAccount) {
        throw new httpErrors.NotFoundError(
          `${errMsg.TRANSFER_ERROR}: ${errMsg.ACCOUNT_NOT_FOUND}`
        );
      }
      if (fromAccount === toAccount) {
        throw new httpErrors.ConflictError(
          `${errMsg.TRANSFER_ERROR}: ${errMsg.ACCOUNT_CONFLICT_ERROR}`
        );
      }

      const newFromBalance = Number(fromAccount.balance) - amount;
      const newToBalance = Number(toAccount.balance) + amount;

      await fromAccount.$query(trx).patch({ balance: newFromBalance });
      await toAccount.$query(trx).patch({ balance: newToBalance });

      return { data: { balance: newFromBalance } };
    });
  } catch (error) {
    throw new httpErrors.InternalServerError(
      `${errMsg.DEFAULT}: ${error.message}`
    );
  }
};

export default { createAccount, fundAccount, withdrawFund, transferFund };
