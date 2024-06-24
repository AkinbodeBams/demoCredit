import { Request, Response } from "express";

export enum applicationMessages {
  SUCCESS_RESPONSE_MESSAGE = "The request was successful",
  ERROR_RESPONSE_MESSAGE = "Request failed",
  EXCEPTION_RESPONSE_MESSAGE = "Unexpected application error",
  HEALTH_CHECK_MESSAGE = "Health check",
}

type successResponseInputType = {
  res: Response;
  data?: any;
  message?: string;
  statusCode?: number;
};

type errorResponseInputType = {
  req: Request;
  res: Response;
  code?: any;
  message?: string;
  statusCode?: number;
};

export const successResponse = ({
  res,
  data,
  statusCode,
  message,
}: successResponseInputType) => {
  const responseBody = {
    ...(message && { message }),
    data: data || {},
  };
  return res.status(statusCode || 200).send(responseBody);
};

export const errorResponse = ({
  req,
  res,
  code,
  message,
  statusCode,
}: errorResponseInputType) => {
  const responseMessage =
    message || applicationMessages.EXCEPTION_RESPONSE_MESSAGE;
  const errorCode = code || "error";
  const responseBody = {
    code: errorCode,
    message: responseMessage,
  };

  console.error(`${errorCode},${responseMessage}`);
  return res.status(statusCode || 500).send(responseBody);
};
