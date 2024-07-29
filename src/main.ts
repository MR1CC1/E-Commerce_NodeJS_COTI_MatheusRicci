import express from 'express'
import dotenv from 'dotenv'
import userRoute from './module/user/user.route'
import authRoute from './module/auth/auth.route'
dotenv.config()

const app = express()
app.use(express.json())

app.use('/user', userRoute)
app.use('/auth', authRoute)

app.listen(process.env.PORT, () => {
    console.log(`🚀 Servidor Rodando Na Porta: ${process.env.PORT} 🚀`);
});
