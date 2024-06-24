import { User } from "../models/user";

export class UserDAO {
  static async create(user: Partial<User>): Promise<User> {
    return User.query().insert(user);
  }

  static async findById(id: string): Promise<User | undefined> {
    return User.query().findById(id);
  }

  static async findByEmail(email: string): Promise<User | undefined> {
    return User.query().findOne({ email });
  }

  static async findByPhoneNumber(
    phoneNumber: string
  ): Promise<User | undefined> {
    return User.query().findOne({ phoneNumber });
  }

  static async findByBvn(bvn: string): Promise<User | undefined> {
    return User.query().findOne({ bvn });
  }
}
