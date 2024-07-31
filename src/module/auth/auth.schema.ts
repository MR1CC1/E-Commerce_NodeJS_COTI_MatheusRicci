import { z } from 'zod'

export const authSchema = z.object({
  email: z.string({
    required_error: 'E-mail é obrigatório',
    invalid_type_error: 'E-mail precisa ser to tipo texto'
  }).email({
    message: 'E-mail mal formatado'
  }),
  password: z.string({
    required_error: 'Senha é obrigatória',
    invalid_type_error: 'Senha precisa ser to tipo texto'
  })
})

export const registerSchema = z.object({
  email: z.string({
    required_error: 'E-mail é obrigatório',
    invalid_type_error: 'E-mail precisa ser to tipo texto'
  }).email({
    message: 'E-mail mal formatado'
  }),
  password: z.string({
    required_error: 'Senha é obrigatória',
    invalid_type_error: 'Senha precisa ser to tipo texto'
  })
})