import { transaction } from "objection";
import { CreateAccountDto, UpdateAccountDtoClass } from "../../dto";
import { Account } from "../models";
import { fundAccountReturnData } from "./types";

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

const updateAccount = async (
  account: Account,
  data: UpdateAccountDtoClass
): Promise<Partial<Account>> => {
  const formattedDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const updateData = {
    ...data,
    updatedAt: formattedDate,
  };
  const updatedAccount = await account.$query().patchAndFetch(updateData);
  const { updatedAt, accountNumber, balance } = updatedAccount;
  return { updatedAt, accountNumber, balance };
};

export default {
  createAccount,
  getAccountByUserId,
  getAccountByAccountNumber,
  updateAccount,
};
