import { httpErrors } from "../src/lib";

jest.mock("../../src/database/dao/userDao", () => {
  return {
    createUser: jest.fn().mockImplementation((dto) => {
      if (dto.bvn === "invalid-bvn") {
        throw new httpErrors.ValidationError("Invalid BVN");
      }
      return {
        id: "unique-uuid",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phoneNumber: "08012345678",
        domain: "example.com",
        bvn: "12345678901",
        sessionToken: "mock-token",
        account: {
          accountNumber: "1234567890",
          balance: 0,
        },
      };
    }),
  };
});

jest.mock("../../src/database/dao/accountDao", () => {
  return {
    createAccount: jest.fn().mockImplementation(() => {
      throw new httpErrors.InternalServerError("Error creating account");
    }),
  };
});
