import { z } from 'zod'

export const cartStoreSchema = z.object({
  qtd: z.number({
    required_error: 'Quantidade é obrigatória',
    invalid_type_error: 'Quantidade precisa ser to tipo número'
  }).min(1, {
    message: 'Quantidade mínima de 1 item'
  }),
  productId: z.number({
    required_error: 'Produto é obrigatório',
    invalid_type_error: 'Produto precisa ser to tipo número'
  }),
})