import { prisma } from '@/lib';
import { CreateChannelDto, UpdateChannelDto } from './channel.dto';
import { Channel } from '@prisma/client';
import { deleteFile } from '@/lib/file-handle';

const create = async (payload: CreateChannelDto): Promise<Channel> => {
  const isExist = await prisma.channel.findUnique({ where: { title: payload.title } });
  if (isExist) {
    throw new Error('Channel already exists');
  }
  const { sportChannels, ...data } = payload;
  return await prisma.channel.create({
    data: {
      ...data,
      sportChannels: {
        createMany: {
          data: payload.sportChannels.map((sportId) => ({ sportId })),
        },
      },
    },
  });
};

const findAll = async (): Promise<Channel[]> => {
  return await prisma.channel.findMany({
    include: { sportChannels: { select: { sport: true } } },
  });
};

const findById = async (id: string): Promise<Channel> => {
  return await prisma.channel.findUniqueOrThrow({
    where: { id },
    include: { sportChannels: { select: { sportId: true } } },
  });
};

const update = async (id: string, payload: UpdateChannelDto): Promise<Channel> => {
  const oldChannel = await prisma.channel.findUniqueOrThrow({ where: { id } });
  const { sportChannels, ...data } = payload;
  return await prisma.$transaction(async (tx) => {
    const channelWithSportChannels = await tx.channel.update({
      where: { id },
      data,
      include: { sportChannels: true },
    });
    const { sportChannels: existingSportChannels, ...channel } = channelWithSportChannels;
    const existingSportIds = existingSportChannels.map((sportChannel) => sportChannel.sportId);
    // Find the sport channels that need to be deleted and created
    const toDelete = existingSportIds.filter((id) => !sportChannels?.includes(id));
    const toCreate = sportChannels?.filter((id) => !existingSportIds.includes(id));
    await tx.sportChannel.deleteMany({ where: { channelId: id, sportId: { in: toDelete } } });
    if (!toCreate?.length) return channel;
    await tx.sportChannel.createMany({
      data: toCreate.map((sportId) => ({ channelId: id, sportId })),
    });
    if (oldChannel.icon && oldChannel.icon !== data.icon) {
      deleteFile(oldChannel.icon);
    }
    return channel;
  });
};

const remove = async (id: string): Promise<boolean> => {
  await prisma.channel.findUniqueOrThrow({ where: { id } });
  const data = await prisma.channel.delete({ where: { id } });
  if (data.icon) {
    deleteFile(data.icon);
  }
  return true;
};

export const channelService = { create, findAll, findById, update, remove };
