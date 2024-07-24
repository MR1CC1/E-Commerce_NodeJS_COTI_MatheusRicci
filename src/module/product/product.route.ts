import { Router, Request, Response } from "express";
import productService from "./product.service";
import { ProductSchema, ProductUpdateSchema } from './product.schema';
import { z } from 'zod';

export const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await productService.getAll();
        return res.json(result);
    } catch (error) {
        return res.status(500).json({
            message: `Erro: ${error}`
        });
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        ProductSchema.parse(req.body);
        const result = await productService.store(req.body);
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
        const result = await productService.getById(parseInt(req.params.id, 10));
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
        const result = await productService.destroy(parseInt(req.params.id, 10));
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
        ProductUpdateSchema.parse(req.body);
        const result = await productService.update(parseInt(req.params.id, 10), req.body);
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
