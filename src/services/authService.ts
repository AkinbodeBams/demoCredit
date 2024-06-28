import { userDao } from "../database/dao";
import { generateTokenDto } from "../dto/authDto";
import { errorResponseMessage as errMsg, httpErrors } from "../lib";
import { generateToken } from "../reusables";

const regenerateToken = async (dto: generateTokenDto): Promise<any> => {
  const isValidBvn = await userDao.findByBvn(dto.bvn);

  if (!isValidBvn) {
    throw new httpErrors.NotFoundError(errMsg.USER_NOT_FOUND);
  }
  return { data: { token: generateToken(dto.bvn) } };
};

export default { regenerateToken };
