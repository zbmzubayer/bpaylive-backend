import { prisma } from '@/lib';
import { CreateMatchDto, UpdateMatchDto } from './match.dto';
import { deleteFile } from '@/lib/file-handle';

const create = async (payload: CreateMatchDto) => {
  const { channelMatches, ...data } = payload;
  return await prisma.$transaction(async (tx) => {
    const match = await tx.match.create({ data });
    // Channel matches
    if (channelMatches && channelMatches.length > 0) {
      await tx.channelMatch.createMany({
        data: channelMatches.map((channelId) => ({
          channelId,
          matchId: match.id,
        })),
      });
    }

    return match;
  });
};

const findAll = async () => {
  return await prisma.match.findMany({
    include: { sport: true, defaultChannel: true, channelMatches: { select: { channel: true } } },
    orderBy: { updatedAt: 'desc' },
  });
};

const findById = async (id: string) => {
  return await prisma.match.findUniqueOrThrow({
    where: { id },
    include: { sport: true, defaultChannel: true, channelMatches: { select: { channel: true } } },
  });
};

const update = async (id: string, payload: UpdateMatchDto) => {
  const oldMatch = await prisma.match.findUniqueOrThrow({ where: { id } });
  const { channelMatches, ...data } = payload;
  return await prisma.$transaction(async (tx) => {
    const channelWithSportChannels = await tx.match.update({
      where: { id },
      data,
      include: { channelMatches: true },
    });
    const { channelMatches: existingChannelMatches, ...channel } = channelWithSportChannels;
    const existingChannelIds = existingChannelMatches.map((i) => i.channelId);
    // Find the sport channels that need to be deleted and created
    const toDelete = existingChannelIds.filter((i) => !channelMatches?.includes(i));
    const toCreate = channelMatches?.filter((i) => !existingChannelIds.includes(i));
    await tx.channelMatch.deleteMany({ where: { matchId: id, channelId: { in: toDelete } } });
    if (!toCreate?.length) return channel;
    await tx.channelMatch.createMany({
      data: toCreate.map((i) => ({ matchId: id, channelId: i })),
    });
    if (oldMatch.thumbnail && oldMatch.thumbnail !== data.thumbnail) {
      deleteFile(oldMatch.thumbnail);
    }
    return channel;
  });
};

const remove = async (id: string): Promise<boolean> => {
  await prisma.match.findUniqueOrThrow({ where: { id } });
  const data = await prisma.match.delete({ where: { id } });
  if (data.thumbnail) {
    deleteFile(data.thumbnail);
  }
  return true;
};

const findByURL = async (url: string) => {
  return await prisma.match.findUniqueOrThrow({
    where: { url },
    include: { sport: true, defaultChannel: true, channelMatches: { select: { channel: true } } },
  });
};

export const matchService = { create, findAll, findById, update, remove, findByURL };
