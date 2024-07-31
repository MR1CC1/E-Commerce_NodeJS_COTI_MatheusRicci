import type { Cart as CartPrisma } from '@prisma/client'

export interface CartBase {
  productId: number
  userId: number
  qtd: number
  createdAt: Date
}

export interface CartStore extends CartBase { }

export type CartUpdate = Partial<CartStore>

export type Cart = CartPrisma

export type CartUpsert = Pick<CartBase, 'productId' | 'userId' | 'qtd'>