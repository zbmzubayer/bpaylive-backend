import { z } from 'zod';

const create = z.object({
  name: z.string().min(1, 'Name is required'),
  icon: z.string().min(1, 'Icon is required'),
});

const update = create.partial();

type CreateSportDto = z.infer<typeof create>;
type UpdateSportDto = z.infer<typeof update>;

export type { CreateSportDto, UpdateSportDto };

export const sportZodSchema = { create, update };
