import { CreateAccountDto, CreateUserDto } from "../dto";
import { accountDao, userDao } from "../database/dao";
import { v4 as uuidv4 } from "uuid";
import { findUserWithAccountByUserId } from "../database/dao/userDao";
import accountService from "./accountService";
import { generateToken } from "../reusables";
import adjutorApi from "../lib/adjutorApi";
import {
  errorResponseMessage as errMsg,
  httpErrors,
  successResponseMessage as successMsg,
} from "../lib";

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
    const isBlackListed = await adjutorApi.checkCustomerKarma(
      dto.domain,
      dto.bvn,
      dto.phoneNumber,
      dto.email
    );

    if (isBlackListed) {
      throw new httpErrors.ForbiddenError(errMsg.USER_BLACKLISTED);
    }
    const user = await userDao.createUser({
      id: userId,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email || null,
      phoneNumber: dto.phoneNumber || null,
      domain: dto.domain || null,
      bvn: dto.bvn,
    });

    const accountNumber = await generateUniqueAccountNumber();
    const accountDto = new CreateAccountDto(user.id, accountNumber);
    await accountService.createAccount(accountDto);

    const data = await findUserWithAccountByUserId(user.id);
    const token = generateToken(dto.bvn);

    const responseData = { ...data, sessionToken: token };

    return { data: responseData };
  } catch (error) {
    if (error instanceof httpErrors.ValidationError) {
      throw error;
    } else {
      throw new httpErrors.InternalServerError(
        `${errMsg.ACCOUNT_CREATION_ERROR}`
      );
    }
  }
};

export default { createUser };
