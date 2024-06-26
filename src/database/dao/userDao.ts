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
    .select("firstName", "lastName", "email", "phoneNumber");

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
  const user = User.query().findById(id).select("id");
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

export default {
  createUser,
  findByBvn,
  findByEmail,
  findByPhoneNumber,
  findById,
  findUserWithAccountByUserBvn,
};
