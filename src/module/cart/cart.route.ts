import { Router, Request, Response } from 'express';
import cartService from './cart.service';
import schemaValidate from '../../middleware/schemaValidate';
import { cartStoreSchema } from './cart.schema';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(async (_: Request, res: Response) => {
  const result = await cartService.getAll(res.locals.user.id);
  return res.json(result);
}));

router.post('/', schemaValidate(cartStoreSchema), asyncHandler(async (_: Request, res: Response) => {
  const result = await cartService.upsert({
    userId: res.locals.user.id,
    ...res.locals.validated,
  });
  return res.json(result);
}));

router.delete('/clear', asyncHandler(async (_: Request, res: Response) => {
  const result = await cartService.clear(res.locals.user.id);
  return res.json(result);
}));

router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const result = await cartService.destroy(Number(req.params.id));
  return res.json(result);
}));

export default router;
