import { Request, Response } from "express";
import { CreateUserDto } from "../dto";
import userService from "../services/userService";
import { validate } from "../lib/validator";
import { errorResponse, successResponse } from "../lib/httpResponse";

const createUser = async (req: Request, res: Response) => {
  const dto = await validate<CreateUserDto>({ ...req.body }, CreateUserDto);
  const response = await userService.createUser(dto);

  if (!response.data) {
    return errorResponse({ ...response, req, res });
  }
  return successResponse({ res, data: response.data });
};

export default { createUser };
