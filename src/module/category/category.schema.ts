import { z } from 'zod'

export const categoryStoreSchema = z.object({
  name: z.string({
    required_error: 'Nome é obrigatório',
    invalid_type_error: 'Nome precisa ser to tipo texto'
  }).trim(),
})

export const categoryUpdateSchema = categoryStoreSchema.partial()