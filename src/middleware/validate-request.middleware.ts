import { type NextFunction, type Request, type Response } from 'express';
import { type ZodSchema } from 'zod';

const validateRequest =
  (schema: ZodSchema) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        ...req.body,
        ...req.file,
        ...req.params,
        ...req.query,
        ...req.cookies,
      });
      next();
    } catch (err) {
      next(err);
    }
  };

export default validateRequest;
