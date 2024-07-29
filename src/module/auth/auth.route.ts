import { Router, Request, Response } from 'express'
import schemaValidate from '../../middleware/schemaValidate'
import { authSchema } from './auth.schema'
import authService from './auth.service'

const router = Router()

router.post('/login', schemaValidate(authSchema), async (req: Request, res: Response) => {
  try {
    const result = await authService.login(res.locals.validated)
    return res.json(result)
  } catch (error: any) {
    return res.status(error.status).json({
      message: error.message
    })
  }
})

export default router