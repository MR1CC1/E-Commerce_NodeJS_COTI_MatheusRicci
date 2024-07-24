import { PrismaClient } from '@prisma/client';
import { UserInterface, UserUpdate } from './user';
import { UserSchema, UserUpdateSchema } from './user.schema';
import { z } from 'zod';

const prisma = new PrismaClient();

const getAll = async (): Promise<UserInterface[]> => {
    const result = await prisma.user.findMany();
    return result;
};

const store = async (params: UserInterface): Promise<UserInterface> => {
    const parsedParams = UserSchema.parse(params);
    const result = await prisma.user.create({
        data: {
            name: parsedParams.name,
            email: parsedParams.email,
            password: parsedParams.password,
            isAdmin: parsedParams.isAdmin,
            createdAt: parsedParams.createdAt,
        }
    });

    return result;
};

const getById = async (id: number): Promise<UserInterface | null> => {
    const result = await prisma.user.findFirst({
        where: { id }
    });

    return result;
};

const destroy = async (id: number): Promise<UserInterface> => {
    const result = await prisma.user.delete({
        where: { id }
    });

    return result;
};

const update = async (id: number, params: UserUpdate): Promise<UserInterface> => {
    const parsedParams = UserUpdateSchema.parse(params);
    const result = await prisma.user.update({
        where: { id },
        data: parsedParams,
    });

    return result;
};

export default {
    getAll,
    store,
    getById,
    destroy,
    update
};
