import type { Category as CategoryPrisma } from '@prisma/client'

export interface CategoryBase {
  name: string
}

export interface CategoryStore extends CategoryBase { }

export type CategoryUpdate = Partial<CategoryStore>

export type Category = CategoryPrisma