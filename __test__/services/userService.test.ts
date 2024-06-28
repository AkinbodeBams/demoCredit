import { initializeDatabase } from "../../src/database"; // Adjust path if necessary
import userService from "../../src/services/userService";
import { CreateUserDto } from "../../src/dto";
import { httpErrors, errorResponseMessage as errMsg } from "../../src/lib";
import adjutorApi from "../../src/lib/adjutorApi";
import { accountService } from "../../src/services";
import { userDao } from "../../src/database/dao";
import { generateToken } from "../../src/reusables";
import { Model } from "objection";

import { v4 as uuidv4 } from "uuid";

jest.mock("../../src/database/dao/userDao");
jest.mock("../../src/services/accountService");
jest.mock("../../src/lib/adjutorApi");
jest.mock("../../src/reusables");
jest.mock("uuid");

describe("userService", () => {
  beforeAll(async () => {
    const knex = await initializeDatabase();
    Model.knex(knex);
  });

  describe("createUser", () => {
    let dto: CreateUserDto;

    beforeEach(() => {
      dto = {
        bvn: "12345678901",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phoneNumber: "08012345678",
        domain: "example.com",
        contactInfo: "email",
      };

      (uuidv4 as jest.Mock).mockReturnValue("unique-uuid");

      (adjutorApi.checkCustomerKarma as jest.Mock).mockResolvedValue(false);

      (userDao.createUser as jest.Mock).mockResolvedValue({
        id: "unique-uuid",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phoneNumber: "08012345678",
        domain: "example.com",
        bvn: "12345678901",
      });

      (accountService.createAccount as jest.Mock).mockResolvedValue({
        id: "unique-account-id",
        userId: "unique-uuid",
        accountNumber: "1234567890",
        balance: 0,
        isActive: true,
      });

      (userDao.findUserWithAccountByUserId as jest.Mock).mockResolvedValue({
        id: "unique-uuid",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phoneNumber: "08012345678",
        domain: "example.com",
        bvn: "12345678901",
        account: {
          accountNumber: "1234567890",
          balance: 0,
        },
      });

      (generateToken as jest.Mock).mockReturnValue("mock-token");
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should create a user successfully", async () => {
      const result = await userService.createUser(dto);

      expect(adjutorApi.checkCustomerKarma).toHaveBeenCalledWith(
        dto.domain,
        dto.bvn,
        dto.phoneNumber,
        dto.email
      );

      expect(userDao.createUser).toHaveBeenCalledWith({
        id: "unique-uuid",
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phoneNumber: dto.phoneNumber,
        domain: dto.domain,
        bvn: dto.bvn,
      });

      expect(accountService.createAccount).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: "unique-uuid",
          accountNumber: expect.any(String),
        })
      );

      expect(userDao.findUserWithAccountByUserId).toHaveBeenCalledWith(
        "unique-uuid"
      );

      expect(generateToken).toHaveBeenCalledWith(dto.bvn);

      expect(result).toEqual({
        data: {
          id: "unique-uuid",
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phoneNumber: "08012345678",
          domain: "example.com",
          bvn: "12345678901",
          account: {
            accountNumber: "1234567890",
            balance: 0,
          },
          sessionToken: "mock-token",
        },
      });
    });

    it("should throw a ForbiddenError if user is blacklisted", async () => {
      (adjutorApi.checkCustomerKarma as jest.Mock).mockResolvedValue(true);

      await expect(userService.createUser(dto)).rejects.toThrow(
        httpErrors.ForbiddenError
      );
      await expect(userService.createUser(dto)).rejects.toThrow(
        errMsg.USER_BLACKLISTED
      );
    });

    it("should throw an InternalServerError if account creation fails", async () => {
      (userDao.createUser as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await expect(userService.createUser(dto)).rejects.toThrow(
        httpErrors.InternalServerError
      );
      await expect(userService.createUser(dto)).rejects.toThrow(
        errMsg.ACCOUNT_CREATION_ERROR
      );
    });
  });
});
