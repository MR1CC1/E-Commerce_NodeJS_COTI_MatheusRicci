import { PrismaClient } from '@prisma/client';
import { AuthInterface, AuthResponse } from './auth';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const login = async (params: AuthInterface): Promise<AuthResponse | null> => {
    const user = await prisma.user.findUnique({ where: { email: params.email } });
    if (!user) {
        throw new Error('Usuário não encontrado');
    }

    const validPassword = await bcrypt.compare(params.password, user.password);
    if (!validPassword) {
        throw new Error('Senha inválida');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET || 'stringqualquerteste', {
        expiresIn: '1h',
    });

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        token,
    };
};

const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.SECRET || 'stringqualquerteste');
    } catch (error) {
        throw new Error('Token inválido');
    }
};

export default {
    login,
    verifyToken,
};
