import { userDao } from "../database/dao";
import { generateTokenDto } from "../dto/authDto";
import { errorResponseMessage as errMsg, httpErrors } from "../lib";
import { generateToken } from "../reusables";

const regenerateToken = async (dto: generateTokenDto): Promise<any> => {
  try {
    const isValidBvn = await userDao.findByBvn(dto.bvn);

    if (!isValidBvn) {
      throw new httpErrors.NotFoundError(errMsg.USER_NOT_FOUND);
    }
    return { data: { token: generateToken(dto.bvn) } };
  } catch (error) {
    throw new httpErrors.InternalServerError(
      `${errMsg.DEFAULT}: ${error.message}`
    );
  }
};

export default { regenerateToken };
