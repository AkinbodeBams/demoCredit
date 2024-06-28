import { userDao } from "../src/database/dao";
import authService from "../src/services/authService";
import { generateTokenDto } from "../src/dto/authDto";
import { errorResponseMessage as errMsg, httpErrors } from "../src/lib";
import { generateToken } from "../src/reusables";

jest.mock("../../src/database/dao", () => ({
  userDao: {
    findByBvn: jest.fn(),
  },
}));

jest.mock("../../src/reusables", () => ({
  generateToken: jest.fn(),
}));

describe("Auth Service", () => {
  describe("regenerateToken", () => {
    it("should regenerate token successfully", async () => {
      const dto = new generateTokenDto("12345678901");
      (userDao.findByBvn as jest.Mock).mockResolvedValue(true);
      (generateToken as jest.Mock).mockReturnValue("new-token");

      const result = await authService.regenerateToken(dto);
      expect(userDao.findByBvn).toHaveBeenCalledWith(dto.bvn);
      expect(generateToken).toHaveBeenCalledWith(dto.bvn);
      expect(result).toEqual({ data: { token: "new-token" } });
    });

    it("should handle errors during token regeneration", async () => {
      const dto = new generateTokenDto("12345678901");
      const error = new Error("Database error");
      (userDao.findByBvn as jest.Mock).mockRejectedValueOnce(error);

      await expect(authService.regenerateToken(dto)).rejects.toThrow(
        new httpErrors.InternalServerError(
          `${errMsg.DEFAULT}: ${error.message}`
        )
      );
    });
  });
});
