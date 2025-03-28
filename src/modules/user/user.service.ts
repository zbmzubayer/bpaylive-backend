import { User } from '@prisma/client';
import { ApiError } from '@/shared/api-error';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { prisma } from '@/lib';
import { HttpStatus } from '@/shared/enums';
import { hash } from '@/modules/auth/hash';

const create = async (payload: CreateUserDto): Promise<Partial<User>> => {
  const isUserExist = await prisma.user.findUnique({ where: { username: payload.username } });
  if (isUserExist) {
    throw new ApiError(HttpStatus.BAD_REQUEST, 'User with same username already exists');
  }
  payload.password = await hash.create(payload.password);
  const newUser = await prisma.user.create({ data: payload });

  return newUser;
};

const findAll = async (): Promise<Partial<User>[]> => {
  return await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
};

const findById = async (id: string): Promise<Partial<User>> => {
  return await prisma.user.findUniqueOrThrow({ where: { id } });
};

const update = async (id: string, payload: UpdateUserDto): Promise<Partial<User>> => {
  await prisma.user.findUniqueOrThrow({ where: { id } });
  return await prisma.user.update({ where: { id }, data: payload });
};

const remove = async (id: string): Promise<boolean> => {
  await prisma.user.findUniqueOrThrow({ where: { id } });
  await prisma.user.delete({ where: { id } });
  return true;
};

export const userService = { create, findAll, findById, update, remove };
