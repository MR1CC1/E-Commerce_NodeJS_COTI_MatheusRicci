import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

const schemaValidate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = schema.parse(req.body)
    res.locals.validated = validated
    return next()

  } catch (error: any) {
    return res.status(422).json(error.errors)

  }
}

export default schemaValidate