import { Router, Request, Response } from "express";
import authService from "./auth.service";
import { AuthSchema } from './auth.schema';
import { z } from 'zod';

export const router = Router();

router.post('/login', async (req: Request, res: Response) => {
    try {
        AuthSchema.parse(req.body);
        const result = await authService.login(req.body);
        return res.json(result);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: 'Erro de Validação',
                issues: error.errors
            });
        }
        if (error instanceof Error) {
            return res.status(400).json({
                message: `Erro: ${error.message}`
            });
        }
        return res.status(400).json({
            message: 'Erro Desconhecido'
        });
    }
});
