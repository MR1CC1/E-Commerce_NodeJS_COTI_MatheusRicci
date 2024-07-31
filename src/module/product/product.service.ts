import { prisma } from "../../config/db"
import { ProductStore, ProductUpdate, Product } from "./product"

const getAll = async (): Promise<Product[]> => {
  return await prisma.product.findMany()
}

const getOne = async (id: number): Promise<Product | null> => {
  return await prisma.product.findFirst({
    where: { id }
  })
}

const store = async (params: ProductStore): Promise<Product> => {
  return await prisma.product.create({
    data: params
  })
}

const update = async (id: number, params: ProductUpdate): Promise<Product> => {
  return await prisma.product.update({
    where: { id },
    data: params
  })
}

const destroy = async (id: number): Promise<Product> => {
  return await prisma.product.delete({
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