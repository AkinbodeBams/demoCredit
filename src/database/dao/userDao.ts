import { Transaction } from "objection";
import { User } from "../models";

const createUser = async (user: Partial<User>): Promise<User> => {
  const createdUser = await User.query().insert(user);
  return createdUser;
};

export const findUserWithAccountByUserId = async (
  id: string
): Promise<User | undefined> => {
  const user = await User.query()
    .findById(id)
    .withGraphFetched("account")
    .modifyGraph("account", (builder) => {
      builder.select("accountNumber", "balance");
    })
    .select("firstName", "lastName", "email", "phoneNumber", "domain");

  return user;
};
export const findUserWithAccountByUserBvn = async (
  bvn: string
): Promise<User | undefined> => {
  const user = await User.query()
    .findById(bvn)
    .withGraphFetched("account")
    .modifyGraph("account", (builder) => {
      builder.select("accountNumber");
    })
    .select("firstName", "lastName", "id");

  return user;
};
const findById = async (id: string): Promise<User | undefined> => {
  const user = User.query().findById(id).select("*");
  return user;
};

const findByEmail = async (email: string): Promise<User | undefined> => {
  return User.query()
    .findOne({ email })
    .select("firstName", "lastName", "email", "phoneNumber");
};

const findByPhoneNumber = async (
  phoneNumber: string
): Promise<User | undefined> => {
  return User.query()
    .findOne({ phoneNumber })
    .select("firstName", "lastName", "email", "phoneNumber");
};

const findByBvn = async (bvn: string): Promise<User | undefined> => {
  return User.query().findOne({ bvn }).select("*", "bvn");
};

const findByUserAccountNumber = async (
  accountNumber: string,
  trx?: Transaction
): Promise<User | undefined> => {
  try {
    const user = await User.query(trx)
      .joinRelated("account") // Assuming the relationship is defined
      .where("account.accountNumber", accountNumber)
      .select("users.*")
      .first();

    return user;
  } catch (error) {
    console.error("Error finding user by account number:", error);
    return undefined;
  }
};

export default {
  createUser,
  findByBvn,
  findByEmail,
  findByPhoneNumber,
  findById,
  findUserWithAccountByUserBvn,
  findUserWithAccountByUserId,
  findByUserAccountNumber,
};
