import { z } from 'zod';

export const UserSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, { message: "Nome é Obrigatório" }),
    email: z.string().email({ message: "Endereço de Email Inválido!" }),
    password: z.string().min(6, { message: "A Senha precisa de pelo menos 6 caracteres!" }),
    isAdmin: z.boolean().optional(),
    createdAt: z.date().optional(),
});

export const UserUpdateSchema = UserSchema.partial();
