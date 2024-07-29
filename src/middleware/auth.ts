import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(403).json({
      message: 'Token não encontrado'
    })
  }

  try {
    const decrypted = jwt.verify(req.headers.authorization.split('bearer ')[1], process.env.JWT_SECRET || '')
    res.locals.user = decrypted;
    return next()
  } catch (error: any) {
    return res.status(403).json({
      message: 'Falha na autenticação'
    })
  }

}

export default authMiddleware