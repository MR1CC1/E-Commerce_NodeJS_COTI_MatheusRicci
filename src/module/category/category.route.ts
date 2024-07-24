import { Router, Request, Response } from "express";
import categoryService from "./category.service";
import { CategorySchema, CategoryUpdateSchema } from './category.schema';
import { z } from 'zod';

export const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await categoryService.getAll();
        return res.json(result);
    } catch (error) {
        return res.status(500).json({
            message: `Erro: ${error}`
        });
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        CategorySchema.parse(req.body);
        const result = await categoryService.store(req.body);
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

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const result = await categoryService.getById(parseInt(req.params.id, 10));
        return res.json(result);
    } catch (error: unknown) {
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

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const result = await categoryService.destroy(parseInt(req.params.id, 10));
        return res.json(result);
    } catch (error: unknown) {
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

router.put('/:id', async (req: Request, res: Response) => {
    try {
        CategoryUpdateSchema.parse(req.body);
        const result = await categoryService.update(parseInt(req.params.id, 10), req.body);
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
