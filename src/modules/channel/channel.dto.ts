import { z } from 'zod';

const create = z.object({
  title: z.string().min(3),
  icon: z.string().min(3),
  recommended: z.boolean().default(false),
  streamUrls: z.array(z.string()).min(1),
  sportChannels: z.array(z.string()).min(1),
});

const update = create.partial();

type CreateChannelDto = z.infer<typeof create>;
type UpdateChannelDto = z.infer<typeof update>;

export type { CreateChannelDto, UpdateChannelDto };

export const channelZodSchema = { create, update };
