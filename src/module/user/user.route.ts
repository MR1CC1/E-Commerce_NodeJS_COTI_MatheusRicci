// Path: src/module/user/user.route.ts

import { Router, Request, Response, NextFunction } from 'express';
import userService from './user.service';
import schemaValidate from '../../middleware/schemaValidate';
import { userStoreSchema, userUpdateSchema } from './user.schema';
import authMiddleware from '../../middleware/auth';

const router = Router();
//router.use(authMiddleware);

router.get('/', async (_: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getAll();
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getOne(parseInt(req.params.id, 10));
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', schemaValidate(userStoreSchema), async (_: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.store(res.locals.validated);
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', schemaValidate(userUpdateSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.update(parseInt(req.params.id, 10), res.locals.validated);
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.destroy(Number(req.params.id));
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
