import { transaction } from "objection";
import { accountDao } from "../database/dao";
import { Account, User } from "../database/models";
import {
  CreateAccountDto,
  WithdrawAccountDto,
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

const fundAccount = async (req: Request, dto: FundDto): Promise<any> => {
  const { amount, source } = dto;
  const user = req.user;
  if (!user) return;

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

const withdrawFund = async (
  req: Request,
  dto: WithdrawAccountDto
): Promise<any> => {
  const { amount } = dto;
  const user = req.user;
  // if (!user) return;

  try {
    return transaction(Account.knex(), async (trx) => {
      const account = await accountDao.getAccountByUserId(
        user!.id as string,
        trx
      );
      console.log(account);

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
          message: `Withdrew fund from Account, balance is now ${newBalance}`,
        },
      };
    });
  } catch (error) {
    throw new httpErrors.InternalServerError(
      `${errMsg.DEFAULT}: ${error.message}`
    );
  }
};

const transferFund = async (
  req: Request,
  dto: TransferFundDto
): Promise<any> => {
  const { recipientAccountNumber, amount } = dto;
  const sender = req.user!.id as string;
  try {
    return transaction(Account.knex(), async (trx) => {
      const [fromAccount, toAccount] = await Promise.all([
        accountDao.getAccountByUserId(sender, trx),
        accountDao.getAccountByAccountNumber(recipientAccountNumber, trx),
      ]);

      if (!fromAccount || !toAccount) {
        throw new httpErrors.NotFoundError(
          `${errMsg.TRANSFER_ERROR}: ${errMsg.ACCOUNT_NOT_FOUND}`
        );
      }
      if (fromAccount!.id === toAccount.id) {
        throw new httpErrors.ConflictError(
          `${errMsg.TRANSFER_ERROR}: ${errMsg.ACCOUNT_CONFLICT_ERROR}`
        );
      }
      if (fromAccount.balance < amount) {
        throw new httpErrors.InsufficientBalanceError(
          `${errMsg.TRANSFER_ERROR}: ${errMsg.INSUFFICIENT_BALANCE_ERROR}`
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
