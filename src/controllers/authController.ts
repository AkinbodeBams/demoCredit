import { Request, Response } from "express";
import { validate } from "../lib/validator";
import { errorResponse, successResponse } from "../lib/httpResponse";
import { generateTokenDto } from "../dto/authDto";

import { authService } from "../services";

const regenerateToken = async (req: Request, res: Response) => {
  const dto = await validate<generateTokenDto>(
    { ...req.query },
    generateTokenDto
  );

  const response = await authService.regenerateToken(dto);
  if (!response.data) {
    return errorResponse({ ...response, res });
  }
  return successResponse({ res, data: response.data });
};

export default { regenerateToken };
