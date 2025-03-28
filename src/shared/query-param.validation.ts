import { z } from "zod";

export const reqParamsSchema = z.object({
  id: z.string().uuid({
    message: "Invalid id",
  }),
});

export const reqQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((value) => (value ? parseInt(value, 10) : undefined)),
  limit: z
    .string()
    .optional()
    .transform((value) => (value ? parseInt(value, 10) : undefined)),
  sort: z.string().optional(),
  filter: z.string().optional(),
});

export type ReqParamsId = z.infer<typeof reqParamsSchema>;
export type ReqQuery = z.infer<typeof reqQuerySchema>;
