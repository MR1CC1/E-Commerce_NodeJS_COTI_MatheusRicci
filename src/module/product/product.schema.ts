import { z } from 'zod';

export const ProductSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, { message: "Nome é Obrigatório" }),
    price: z.number().positive({ message: "O preço deve ser positivo" }),
    quantity: z.number().int().min(0, { message: "A quantidade deve ser maior ou igual a zero" }),
    categoryId: z.number().int(),
});

export const ProductUpdateSchema = ProductSchema.partial();
