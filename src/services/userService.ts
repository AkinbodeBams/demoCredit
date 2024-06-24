import { CreateAccountDto, CreateUserDto } from "../dto";
import { Account } from "../database/models";
import { accountDao, userDao } from "../database/dao";
import { httpErrors } from "../lib/errorHandler";

const createUser = async (dto: CreateUserDto) => {
  try {
    if (!dto.firstName || !dto.lastName || !dto.bvn) {
      throw new httpErrors.ValidationError("Missing required fields");
    }
    const user = await userDao.createUser({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email || null,
      phoneNumber: dto.phoneNumber || null,
      bvn: dto.bvn,
    });

    if (!user.id) {
      throw new httpErrors.InternalServerError("User ID is undefined");
    }

    const accountNumber = generateUniqueAccountNumber();

    const accountDto = new CreateAccountDto(user.id, accountNumber);

    await createAccount(accountDto);

    return { data: { user } };
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

const createAccount = async (dto: CreateAccountDto): Promise<Account> => {
  try {
    return await accountDao.createAccount({
      userId: dto.userId,
      accountNumber: dto.accountNumber,
      isActive: true,
    });
  } catch (error) {
    throw new httpErrors.InternalServerError(
      "Error creating account: " + error.message
    );
  }
};

const generateUniqueAccountNumber = (): string => {
  return Math.random().toString().slice(2, 12); // Generates a random 10 digit number
};

export default { createUser };
