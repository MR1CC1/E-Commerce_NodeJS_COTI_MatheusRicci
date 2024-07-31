import { prisma } from "../../config/db"
import { UserStore, UserUpdate, User } from "./user"

const getAll = async (): Promise<User[]> => {
  return await prisma.user.findMany()
}

const getOne = async (id: number): Promise<User | null> => {
  return await prisma.user.findFirst({
    where: { id }
  })
}

const getByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findFirst({
    where: { email }
  })
}

const store = async (params: UserStore): Promise<User> => {
  return await prisma.user.create({
    data: params
  })
}

const update = async (id: number, params: UserUpdate): Promise<User> => {
  return await prisma.user.update({
    where: { id },
    data: params
  })
}

const destroy = async (id: number): Promise<User> => {
  return await prisma.user.delete({
    where: { id }
  })
}

export default {
  getAll,
  getOne,
  getByEmail,
  store,
  update,
  destroy
}