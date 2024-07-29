// Path: src/module/category/category.service.ts

import { prisma } from "../../config/db";
import { CategoryStore, CategoryUpdate, Category } from "./category";
import { ApiError } from "../../libs/errorHandler";

const getAll = async (): Promise<Category[]> => {
  return await prisma.category.findMany();
}

const getOne = async (id: number): Promise<Category> => {
  const category = await prisma.category.findFirst({
    where: { id },
  });

  if (!category) {
    throw new ApiError(404, 'Categoria não encontrada');
  }

  return category;
}

const store = async (params: CategoryStore): Promise<Category> => {
  const existingCategory = await prisma.category.findFirst({
    where: { name: params.name },
  });
  
  if (existingCategory) {
    throw new ApiError(400, 'Categoria com este nome já existe');
  }

  return await prisma.category.create({
    data: params,
  });
}

const update = async (id: number, params: CategoryUpdate): Promise<Category> => {
  const category = await prisma.category.update({
    where: { id },
    data: params,
  });

  if (!category) {
    throw new ApiError(404, 'Categoria não encontrada');
  }

  return category;
}

const destroy = async (id: number): Promise<Category> => {
  const category = await prisma.category.delete({
    where: { id },
  });

  if (!category) {
    throw new ApiError(404, 'Categoria não encontrada');
  }

  return category;
}

export default {
  getAll,
  getOne,
  store,
  update,
  destroy,
};
