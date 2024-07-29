// Path: src/module/user/user.service.ts

import { prisma } from "../../config/db";
import { UserStore, UserUpdate, User } from "./user";
import { ApiError } from "../../libs/errorHandler";

const getAll = async (): Promise<User[]> => {
  return await prisma.user.findMany();
}

const getOne = async (id: number): Promise<User> => {
  const user = await prisma.user.findFirst({
    where: { id },
  });

  if (!user) {
    throw new ApiError(404, 'Usuário não encontrado');
  }

  return user;
}

const getByEmail = async (email: string): Promise<User> => {
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    throw new ApiError(404, 'Usuário não encontrado');
  }

  return user;
}

const store = async (params: UserStore): Promise<User> => {
  const existingUser = await prisma.user.findFirst({
    where: { email: params.email },
  });

  if (existingUser) {
    throw new ApiError(400, 'E-mail já cadastrado');
  }

  return await prisma.user.create({
    data: params,
  });
}

const update = async (id: number, params: UserUpdate): Promise<User> => {
  const user = await prisma.user.update({
    where: { id },
    data: params,
  });

  if (!user) {
    throw new ApiError(404, 'Usuário não encontrado');
  }

  return user;
}

const destroy = async (id: number): Promise<User> => {
  const user = await prisma.user.delete({
    where: { id },
  });

  if (!user) {
    throw new ApiError(404, 'Usuário não encontrado');
  }

  return user;
}

export default {
  getAll,
  getOne,
  getByEmail,
  store,
  update,
  destroy,
};
