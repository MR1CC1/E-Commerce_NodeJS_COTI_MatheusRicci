import { Request, Response, NextFunction } from 'express';

export class ApiError extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // Log do erro para depuração
  res.status(err.status || 500).json({
    message: err.message || 'Erro interno do servidor',
  });
};
