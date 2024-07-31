import { Prisma } from "@prisma/client"
import { prisma } from "../../config/db"
import { CartStore, CartUpdate, Cart, CartUpsert } from "./cart"
import productService from "../product/product.service"
import { ApiError } from "../../libs/errorHandler"

const clear = async (userId: number): Promise<Prisma.BatchPayload> => {
  return await prisma.cart.deleteMany({
    where: { userId }
  })
}

const getAll = async (userId: number): Promise<Cart[]> => {
  return await prisma.cart.findMany({
    where: {
      userId,
    }
  })
}

const getOne = async (userId: number, productId: number): Promise<Cart | null> => {
  return await prisma.cart.findFirst({
    where: {
      userId,
      productId
    }
  })
}

const store = async (params: CartStore): Promise<Cart> => {
  return await prisma.cart.create({
    data: params
  })
}

const update = async (id: number, params: CartUpdate): Promise<Cart> => {
  return await prisma.cart.update({
    where: { id },
    data: params
  })
}

const destroy = async (id: number): Promise<Cart> => {
  return await prisma.cart.delete({
    where: { id }
  })
}

const upsert = async ({
  userId,
  productId,
  qtd
}: CartUpsert): Promise<Cart> => {
  const product = await productService.getOne(productId)
  if (!product) {
    throw new ApiError(404, 'Produto não encontrado')
  }

  if (qtd > product.qtd) {
    throw new ApiError(400, `Não foi possível por ${product.name} no carrinho. Apenas temos ${product.qtd} em estoque.`)
  }

  const cart = await getOne(userId, productId)
  if (cart) {
    const newQtd = cart.qtd + qtd
    if (newQtd > product.qtd) {
      throw new ApiError(400, `Não foi possível incluir mais ${qtd} de ${product.name} no carrinho. Apenas temos ${product.qtd} em estoque.`)
    }

    return await update(cart.id, {
      userId,
      productId,
      qtd: newQtd,
    })
  }

  // await productService.update(product.id, {
  //   qtd: product.qtd - qtd
  // })

  return await store({
    userId,
    productId,
    qtd,
    createdAt: new Date()
  })

}

export default {
  getAll,
  clear,
  upsert,
  destroy
}