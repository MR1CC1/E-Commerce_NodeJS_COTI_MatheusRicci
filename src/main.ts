import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { router as userRouter } from './module/user/user.route';
import { router as categoryRouter } from './module/category/category.route';
import { router as productRouter } from './module/product/product.route';
import { router as authRouter } from './module/auth/auth.route';
import authMiddleware from './middleware/auth.middleware';

const app = express();
app.use(express.json());

app.use('/auth', authRouter);

// Rota de criação de usuário sem autenticação
app.use('/user', userRouter);

// Rotas protegidas por autenticação
app.use('/category', authMiddleware, categoryRouter);
app.use('/product', authMiddleware, productRouter);

app.listen(process.env.PORT, () => {
    console.log(`🚀 Servidor Rodando Na Porta: ${process.env.PORT} 🚀`);
});
