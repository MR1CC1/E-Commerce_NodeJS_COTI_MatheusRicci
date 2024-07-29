// Path: src/module/product/product.service.ts

import { prisma } from "../../config/db";
import { ProductStore, ProductUpdate, Product } from "./product";
import { ApiError } from "../../libs/errorHandler";

const getAll = async (): Promise<Product[]> => {
  return await prisma.product.findMany();
}

const getOne = async (id: number): Promise<Product> => {
  const product = await prisma.product.findFirst({
    where: { id },
  });

  if (!product) {
    throw new ApiError(404, 'Produto não encontrado');
  }

  return product;
}

const store = async (params: ProductStore): Promise<Product> => {
  const existingProduct = await prisma.product.findFirst({
    where: { name: params.name },
  });
  
  if (existingProduct) {
    throw new ApiError(400, 'Produto com este nome já existe');
  }

  return await prisma.product.create({
    data: params,
  });
}

const update = async (id: number, params: ProductUpdate): Promise<Product> => {
  const product = await prisma.product.update({
    where: { id },
    data: params,
  });

  if (!product) {
    throw new ApiError(404, 'Produto não encontrado');
  }

  return product;
}

const destroy = async (id: number): Promise<Product> => {
  const product = await prisma.product.delete({
    where: { id },
  });

  if (!product) {
    throw new ApiError(404, 'Produto não encontrado');
  }

  return product;
}

export default {
  getAll,
  getOne,
  store,
  update,
  destroy,
};
