import {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from "express";
import { HttpStatus } from "./enums";

const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Set status code based on request method type (POST or GET)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      req.method.toUpperCase() === "POST"
        ? (res.statusCode = HttpStatus.CREATED)
        : (res.statusCode = HttpStatus.OK);
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
export default asyncHandler;
