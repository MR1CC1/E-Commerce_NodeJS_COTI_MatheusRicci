import { PrismaClient } from '@prisma/client';
import { CategoryInterface, CategoryUpdate } from './category';
import { CategorySchema, CategoryUpdateSchema } from './category.schema';
import { z } from 'zod';

const prisma = new PrismaClient();

const getAll = async (): Promise<CategoryInterface[]> => {
    const result = await prisma.category.findMany();
    return result;
};

const store = async (params: CategoryInterface): Promise<CategoryInterface> => {
    const parsedParams = CategorySchema.parse(params);
    const existingCategory = await prisma.category.findUnique({ where: { name: parsedParams.name } });
    if (existingCategory) {
        throw new Error('Categoria já existe');
    }
    const result = await prisma.category.create({
        data: {
            name: parsedParams.name,
        }
    });

    return result;
};

const getById = async (id: number): Promise<CategoryInterface | null> => {
    const result = await prisma.category.findFirst({
        where: { id }
    });

    return result;
};

const destroy = async (id: number): Promise<CategoryInterface> => {
    const result = await prisma.category.delete({
        where: { id }
    });

    return result;
};

const update = async (id: number, params: CategoryUpdate): Promise<CategoryInterface> => {
    const parsedParams = CategoryUpdateSchema.parse(params);
    if (parsedParams.name) {
        const existingCategory = await prisma.category.findUnique({ where: { name: parsedParams.name } });
        if (existingCategory && existingCategory.id !== id) {
            throw new Error('Categoria já existe');
        }
    }
    const result = await prisma.category.update({
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
