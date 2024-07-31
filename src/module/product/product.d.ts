import type { Product as ProductPrisma } from '@prisma/client'

export interface ProductBase {
  name: string
  price: number
  qtd: number
  categoryId: number
}

export interface ProductStore extends ProductBase { }

export type ProductUpdate = Partial<ProductStore>

export type Product = ProductPrisma