import type { PrismaClient } from '@prisma/client';

export interface UserTokenPayload {
  id: string;
  role: 'USER' | 'ADMIN';
}

declare module 'express' {
  export interface Request {
    prisma?: PrismaClient;
    user?: UserTokenPayload;
  }
}
