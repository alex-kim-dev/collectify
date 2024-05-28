import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const { ACCESS_TOKEN_SECRET = '' } = process.env;

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (error, payload) => {
    if (error || !payload || typeof payload === 'string') {
      res.sendStatus(403);
      return;
    }

    req.user = { id: payload.id, role: payload.role };
    next();
  });
};
