import { z } from "zod";
import { USER_ROLE } from "./user.constant";

const create = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
  role: z.nativeEnum(USER_ROLE),
});

const update = create.partial();

type CreateUserDto = z.infer<typeof create>;
type UpdateUserDto = z.infer<typeof update>;

export type { CreateUserDto, UpdateUserDto };

export const userZodSchema = { create, update };
