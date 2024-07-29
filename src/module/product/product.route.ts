// Path: src/module/product/product.route.ts

import { Router, Request, Response, NextFunction } from 'express';
import productService from './product.service';
import schemaValidate from '../../middleware/schemaValidate';
import { productStoreSchema, productUpdateSchema } from './product.schema';
import authMiddleware from '../../middleware/auth';

const router = Router();
//router.use(authMiddleware);

router.get('/', async (_: Request, res: Response, next: NextFunction) => {
  try {
    const result = await productService.getAll();
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await productService.getOne(parseInt(req.params.id, 10));
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', schemaValidate(productStoreSchema), async (_: Request, res: Response, next: NextFunction) => {
  try {
    const result = await productService.store(res.locals.validated);
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', schemaValidate(productUpdateSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await productService.update(parseInt(req.params.id, 10), res.locals.validated);
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await productService.destroy(Number(req.params.id));
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
