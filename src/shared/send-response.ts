import { type Response } from "express";
import { ApiResponse, ApiStatus } from "./api-error";

const sendResponse = <T>(res: Response, resObj: ApiResponse<T>): void => {
  const { status, statusCode, message, data, meta } = resObj;
  const resBody: ApiResponse<T> = {
    status: status || ApiStatus.SUCCESS,
    statusCode: statusCode || res.statusCode,
    message,
    data,
    meta,
  };
  res.status(resBody.statusCode!).json(resBody);
};

export default sendResponse;
