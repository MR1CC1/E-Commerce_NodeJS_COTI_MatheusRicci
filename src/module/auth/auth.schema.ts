import { z } from 'zod';

export const AuthSchema = z.object({
    email: z.string().email({ message: "Endereço de Email Inválido!" }),
    password: z.string().min(6, { message: "A Senha precisa de pelo menos 6 caracteres!" }),
});
