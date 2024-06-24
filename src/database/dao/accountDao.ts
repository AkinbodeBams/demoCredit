import { transaction } from "objection";
import { CreateAccountDto } from "../../dto";
import { Account } from "../models";

const createAccount = async (data: CreateAccountDto): Promise<Account> => {
  const account = await Account.query().insert({
    userId: data.userId,
    accountNumber: data.accountNumber,
    balance: data.balance || 0,
    isActive: data.isActive !== undefined ? data.isActive : true,
  });
  return account;
};

const getAccountByUserId = async (
  userId: string
): Promise<Account | undefined> => {
  return await Account.query().where("userId", userId).first();
};

const getAccountByAccountNumber = async (
  accountNumber: string
): Promise<Account | undefined> => {
  return await Account.query().where("accountNumber", accountNumber).first();
};

const fundAccount = async (
  account: Account,
  amount: number
): Promise<Account> => {
  const newBalance = Number(account.balance) + amount;
  const updatedAccount = await account
    .$query()
    .patchAndFetch({ balance: newBalance })
    .select("balance");
  return updatedAccount;
};

export default {
  createAccount,
  getAccountByUserId,
  getAccountByAccountNumber,
  fundAccount,
};
