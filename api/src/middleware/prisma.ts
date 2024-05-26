import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const prismaMiddleware = ((
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.prisma = prisma;
  next();
}) as RequestHandler;
