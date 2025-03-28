import { z } from "zod";

const login = z.object({
  username: z.string(),
  password: z.string().min(6),
});

export type LoginDto = z.infer<typeof login>;

export const authZodSchema = { login };
