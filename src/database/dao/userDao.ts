import { User } from "../models";

const createUser = async (user: Partial<User>): Promise<Partial<User>> => {
  const createdUser = await User.query().insert(user);
  const { bvn, ...userWithoutBvn } = createdUser;
  return userWithoutBvn;
};

const findById = async (id: string): Promise<User | undefined> => {
  return User.query().findById(id).select("*", "bvn");
};

const findByEmail = async (email: string): Promise<User | undefined> => {
  return User.query().findOne({ email }).select("*", "bvn");
};

const findByPhoneNumber = async (
  phoneNumber: string
): Promise<User | undefined> => {
  return User.query().findOne({ phoneNumber }).select("*", "bvn");
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
};
