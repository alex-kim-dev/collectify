import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export const prisma = ((req: Request, res: Response, next: NextFunction) => {
  req.prisma = prismaClient;
  next();
}) as RequestHandler;
