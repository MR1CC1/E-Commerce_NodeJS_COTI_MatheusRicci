import { z } from 'zod';

export const productStoreSchema = z.object({
  name: z.string({
    required_error: 'Nome é obrigatório',
    invalid_type_error: 'Nome precisa ser do tipo texto',
  }).trim(),
  price: z.number({
    required_error: 'Preço é obrigatório',
    invalid_type_error: 'Preço precisa ser do tipo número',
  }),
  quantity: z.number({
    required_error: 'Quantidade é obrigatória',
    invalid_type_error: 'Quantidade precisa ser do tipo número',
  }),
  categoryId: z.number({
    required_error: 'Categoria é obrigatória',
    invalid_type_error: 'Categoria precisa ser do tipo número',
  }),
});

export const productUpdateSchema = productStoreSchema.partial();
