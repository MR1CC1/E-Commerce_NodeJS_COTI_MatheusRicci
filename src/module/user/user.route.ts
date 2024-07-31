import { Router, Request, Response } from 'express';
import userService from './user.service';
import schemaValidate from '../../middleware/schemaValidate';
import { userStoreSchema, userUpdateSchema } from './user.schema';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(async (_: Request, res: Response) => {
  const result = await userService.getAll();
  return res.json(result);
}));

router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.getOne(parseInt(req.params.id, 10));
  return res.json(result);
}));

router.post('/', schemaValidate(userStoreSchema), asyncHandler(async (_: Request, res: Response) => {
  const result = await userService.store(res.locals.validated);
  return res.json(result);
}));

router.put('/:id', schemaValidate(userUpdateSchema), asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.update(parseInt(req.params.id, 10), res.locals.validated);
  return res.json(result);
}));

router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.destroy(Number(req.params.id));
  return res.json(result);
}));

export default router;
