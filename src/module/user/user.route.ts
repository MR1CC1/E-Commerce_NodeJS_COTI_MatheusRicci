import { Router, Request, Response } from 'express'
import userService from './user.service'
import schemaValidate from '../../middleware/schemaValidate'
import { userStoreSchema, userUpdateSchema } from './user.schema'
import authMiddleware from '../../middleware/auth'

const router = Router()

router.get('/', async (_: Request, res: Response) => {
  const result = await userService.getAll()
  return res.json(result)
})

router.get('/:id', async (req: Request, res: Response) => {
  const result = await userService.getOne(parseInt(req.params.id, 10))
  return res.json(result)
})

router.post('/', schemaValidate(userStoreSchema), async (_: Request, res: Response) => {
  const result = await userService.store(res.locals.validated)
  return res.json(result)
})

router.put('/:id', schemaValidate(userUpdateSchema), async (req: Request, res: Response) => {
  const result = await userService.update(parseInt(req.params.id, 10), res.locals.validated)
  return res.json(result)
})

router.delete('/:id', async (req: Request, res: Response) => {
  const result = await userService.destroy(Number(req.params.id))
  return res.json(result)
})

export default router