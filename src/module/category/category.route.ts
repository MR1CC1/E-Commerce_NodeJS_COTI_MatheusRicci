// Path: src/module/category/category.route.ts

import { Router, Request, Response, NextFunction } from 'express';
import categoryService from './category.service';
import schemaValidate from '../../middleware/schemaValidate';
import { categoryStoreSchema, categoryUpdateSchema } from './category.schema';
import authMiddleware from '../../middleware/auth';

const router = Router();
//router.use(authMiddleware);

router.get('/', async (_: Request, res: Response, next: NextFunction) => {
  try {
    const result = await categoryService.getAll();
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await categoryService.getOne(parseInt(req.params.id, 10));
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', authMiddleware, schemaValidate(categoryStoreSchema), async (_: Request, res: Response, next: NextFunction) => {
  try {
    const result = await categoryService.store(res.locals.validated);
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', schemaValidate(categoryUpdateSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await categoryService.update(parseInt(req.params.id, 10), res.locals.validated);
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await categoryService.destroy(Number(req.params.id));
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
