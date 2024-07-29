import type { User as UserPrisma } from '@prisma/client'

export interface UserBase {
  email: string
  password: string
  isAdmin: boolean
}

export interface UserStore extends UserBase { }

export type UserUpdate = Partial<UserStore>

export type User = UserPrisma
