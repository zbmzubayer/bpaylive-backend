import { Sport } from '@prisma/client';
import { ApiError } from '@/shared/api-error';
import { prisma } from '@/lib';
import { HttpStatus } from '@/shared/enums';
import { CreateSportDto, UpdateSportDto } from './sport.dto';
import { deleteFile } from '@/lib/file-handle';

const create = async (payload: CreateSportDto): Promise<Partial<Sport>> => {
  const isExist = await prisma.sport.findUnique({ where: { name: payload.name } });
  if (isExist) {
    throw new ApiError(HttpStatus.BAD_REQUEST, 'Sport already exists');
  }
  return await prisma.sport.create({ data: payload });
};

const findAll = async (): Promise<Sport[]> => {
  return await prisma.sport.findMany({ orderBy: { createdAt: 'desc' } });
};

const findById = async (id: string): Promise<Sport> => {
  return await prisma.sport.findUniqueOrThrow({ where: { id } });
};

const update = async (id: string, payload: UpdateSportDto): Promise<Sport> => {
  const data = await prisma.sport.findUniqueOrThrow({ where: { id } });
  const updated = await prisma.sport.update({ where: { id }, data: payload });
  if (data.icon && data.icon !== payload.icon) {
    deleteFile(data.icon);
  }
  return updated;
};

const remove = async (id: string): Promise<boolean> => {
  await prisma.sport.findUniqueOrThrow({ where: { id } });
  const data = await prisma.sport.delete({ where: { id } });
  if (data.icon) {
    deleteFile(data.icon);
  }
  return true;
};

export const sportService = { create, findAll, findById, update, remove };
