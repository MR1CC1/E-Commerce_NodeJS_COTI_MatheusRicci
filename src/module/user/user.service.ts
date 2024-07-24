import { PrismaClient } from '@prisma/client';
import { UserInterface, UserUpdate } from './user';
import { UserSchema, UserUpdateSchema } from './user.schema';

const prisma = new PrismaClient();

const getAll = async (): Promise<UserInterface[]> => {
    const result = await prisma.user.findMany();
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
    getById,
    destroy,
    update
};
