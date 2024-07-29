import express from 'express';
import dotenv from 'dotenv';
import userRoute from './module/user/user.route';
import authRoute from './module/auth/auth.route';
import categoryRoute from './module/category/category.route';
import productRoute from './module/product/product.route';
import { errorHandler } from './libs/errorHandler';
dotenv.config();

const app = express();
app.use(express.json());

app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/category', categoryRoute);
app.use('/product', productRoute);

// Middleware de tratamento de erros deve ser o último middleware registrado
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Servidor Rodando Na Porta: ${process.env.PORT} 🚀`);
});
