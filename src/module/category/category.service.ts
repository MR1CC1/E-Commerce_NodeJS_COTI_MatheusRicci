import { prisma } from "../../config/db"
import { CategoryStore, CategoryUpdate, Category } from "./category"

const getAll = async (): Promise<Category[]> => {
  return await prisma.category.findMany()
}

const getOne = async (id: number): Promise<Category | null> => {
  return await prisma.category.findFirst({
    where: { id }
  })
}

const store = async (params: CategoryStore): Promise<Category> => {
  return await prisma.category.create({
    data: params
  })
}

const update = async (id: number, params: CategoryUpdate): Promise<Category> => {
  return await prisma.category.update({
    where: { id },
    data: params
  })
}

const destroy = async (id: number): Promise<Category> => {
  return await prisma.category.delete({
    where: { id }
  })
}

export default {
  getAll,
  getOne,
  store,
  update,
  destroy
}