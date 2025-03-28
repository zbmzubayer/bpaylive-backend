import { hash } from '@/modules/auth/hash';
import { ApiError } from '@/shared/api-error';
import { LoginDto } from './auth.dto';
import { prisma } from '@/lib';
import { HttpStatus } from '@/shared/enums';

const login = async (payload: LoginDto) => {
  const { username, password } = payload;

  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true, username: true, password: true, role: true },
  });
  if (!user) {
    throw new ApiError(HttpStatus.NOT_FOUND, 'User not found');
  }

  const isPasswordMatch = await hash.verify(password, user.password);
  if (!isPasswordMatch) {
    throw new ApiError(HttpStatus.BAD_REQUEST, 'Invalid password');
  }

  const adapterUser = { id: user.id, username: user.username, role: user.role };
  return adapterUser;
};

export const authService = { login };
