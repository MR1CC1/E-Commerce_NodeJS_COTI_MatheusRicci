import { PrismaClient } from '@prisma/client';
import { ProductInterface, ProductUpdate } from './product';
import { ProductSchema, ProductUpdateSchema } from './product.schema';

const prisma = new PrismaClient();

const getAll = async (): Promise<ProductInterface[]> => {
    const result = await prisma.product.findMany();
    return result;
};

const store = async (params: ProductInterface): Promise<ProductInterface> => {
    const parsedParams = ProductSchema.parse(params);
    const result = await prisma.product.create({
        data: {
            name: parsedParams.name,
            price: parsedParams.price,
            quantity: parsedParams.quantity,
            categoryId: parsedParams.categoryId,
        }
    });

    return result;
};

const getById = async (id: number): Promise<ProductInterface | null> => {
    const result = await prisma.product.findFirst({
        where: { id }
    });

    return result;
};

const destroy = async (id: number): Promise<ProductInterface> => {
    const result = await prisma.product.delete({
        where: { id }
    });

    return result;
};

const update = async (id: number, params: ProductUpdate): Promise<ProductInterface> => {
    const parsedParams = ProductUpdateSchema.parse(params);
    const result = await prisma.product.update({
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
