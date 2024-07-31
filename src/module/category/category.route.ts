import { Router, Request, Response } from 'express';
import categoryService from './category.service';
import schemaValidate from '../../middleware/schemaValidate';
import { categoryStoreSchema, categoryUpdateSchema } from './category.schema';
import authMiddleware from '../../middleware/auth';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(async (_: Request, res: Response) => {
  const result = await categoryService.getAll();
  return res.json(result);
}));

router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const result = await categoryService.getOne(parseInt(req.params.id, 10));
  return res.json(result);
}));

router.post('/', authMiddleware, schemaValidate(categoryStoreSchema), asyncHandler(async (_: Request, res: Response) => {
  const result = await categoryService.store(res.locals.validated);
  return res.json(result);
}));

router.put('/:id', authMiddleware, schemaValidate(categoryUpdateSchema), asyncHandler(async (req: Request, res: Response) => {
  const result = await categoryService.update(parseInt(req.params.id, 10), res.locals.validated);
  return res.json(result);
}));

router.delete('/:id', authMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const result = await categoryService.destroy(Number(req.params.id));
  return res.json(result);
}));

export default router;
