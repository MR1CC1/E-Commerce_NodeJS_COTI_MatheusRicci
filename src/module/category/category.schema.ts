import { z } from 'zod';

export const CategorySchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, { message: "Nome é Obrigatório" }),
});

export const CategoryUpdateSchema = CategorySchema.partial();
