import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import { router as userRouter } from './module/user/user.route'

const app = express()

app.use('/user', userRouter);

app.listen(process.env.PORT, () => {
    console.log(`🚀 Servidor Rodando Na Porta: ${process.env.PORT} 🚀`)
})