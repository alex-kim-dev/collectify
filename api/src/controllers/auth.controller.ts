import { type Response, type Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { type RegisterCredentials } from '~/schemas';

const {
  ACCESS_TOKEN_SECRET = '',
  REFRESH_TOKEN_SECRET = '',
  ACCESS_TOKEN_EXPIRATION = '',
} = process.env;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS ?? '', 10);

export const authController = {
  async register(
    req: Request<object, object, RegisterCredentials>,
    res: Response,
  ) {
    try {
      if (!req.prisma) throw new Error("Can't access prisma middleware");

      const { prisma } = req;
      const { email, name, password } = req.body;
      const existingUser = await prisma.user.findFirst({ where: { email } });

      if (existingUser) {
        res
          .status(409)
          .send({ message: 'A user with this email already exists' });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role: { connect: { name: 'USER' } },
        },
        select: { id: true, role: { select: { name: true } } },
      });

      const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRATION,
      });
      const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET);
      await prisma.refreshToken.create({
        data: { string: refreshToken, user: { connect: { id: user.id } } },
      });

      res.status(201).send({ ...user, accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  },
};
