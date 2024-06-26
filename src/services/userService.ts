import { CreateAccountDto, CreateUserDto } from "../dto";
import { accountDao, userDao } from "../database/dao";
import { httpErrors } from "../lib/errorHandler";
import { v4 as uuidv4 } from "uuid";
import { findUserWithAccountByUserId } from "../database/dao/userDao";
import accountService from "./accountService";
import { generateToken } from "../reusables";

const generateUniqueAccountNumber = async (): Promise<string> => {
  let unique = false;
  let accountNumber = "";

  while (!unique) {
    accountNumber = Math.floor(
      1000000000 + Math.random() * 9000000000
    ).toString();
    const existingAccount = await accountDao.getAccountByAccountNumber(
      accountNumber
    );

    if (!existingAccount) {
      unique = true;
    }
  }

  return accountNumber;
};

const createUser = async (dto: CreateUserDto) => {
  const userId = uuidv4();
  try {
    const user = await userDao.createUser({
      id: userId,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email || null,
      phoneNumber: dto.phoneNumber || null,
      bvn: dto.bvn,
    });

    const accountNumber = await generateUniqueAccountNumber();
    const accountDto = new CreateAccountDto(user.id, accountNumber);
    const newData = await accountService.createAccount(accountDto);

    const data = await findUserWithAccountByUserId(user.id);
    const token = generateToken(dto.bvn);

    return { data: { ...data, token } };
  } catch (error) {
    if (error instanceof httpErrors.ValidationError) {
      throw error;
    } else {
      throw new httpErrors.InternalServerError(
        "Error creating user: " + error.message
      );
    }
  }
};

export default { createUser };
