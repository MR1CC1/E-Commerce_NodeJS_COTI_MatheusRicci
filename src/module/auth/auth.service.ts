import jwt from "jsonwebtoken"
import userService from "../user/user.service"
import { AuthParams, AuthResponse } from "./auth"
import { ApiError } from "../../libs/errorHandler"

const login = async (params: AuthParams): Promise<AuthResponse> => {
  const user = await userService.getByEmail(params.email)
  if (!user) {
    throw new ApiError(404, 'Usuário não encontrado')
  }

  if (user.password !== params.password) {
    // escrito de propósito para caso seja tentativa de força bruta, o hacker não identificar
    // qual parâmetro está errado
    throw new ApiError(400, 'Usuário e senha incorretos')
  }

  try {
    const token = jwt.sign({
      id: user.id
    }, process.env.JWT_SECRET || '')

    return {
      token,
      user: {
        id: user.id,
        email: user.email
      }
    }
  } catch (error: any) {
    throw new ApiError(400, 'Falha ao gerar token')
  }
}

export default {
  login
}