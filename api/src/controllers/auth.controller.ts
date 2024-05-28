import type { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import type {
  RegisterCredentials,
  RefreshToken,
  LoginCredentials,
} from '~/schemas';

const {
  ACCESS_TOKEN_SECRET = '',
  REFRESH_TOKEN_SECRET = '',
  ACCESS_TOKEN_EXPIRATION = '',
  REFRESH_TOKEN_EXPIRATION = '',
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

      const payload = { id: user.id, role: user.role.name };
      const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRATION,
      });
      const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRATION,
      });
      await prisma.refreshToken.create({
        data: { string: refreshToken, user: { connect: { id: user.id } } },
      });

      res.status(201).send({ ...payload, accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  async logIn(req: Request<object, object, LoginCredentials>, res: Response) {
    try {
      if (!req.prisma) throw new Error("Can't access prisma middleware");

      const { prisma } = req;
      const { email, password } = req.body;
      const user = await prisma.user.findFirst({
        where: { email },
        include: { role: { select: { name: true } } },
      });
      const isCorrectPassword = await bcrypt.compare(
        password,
        user?.password ?? '',
      );

      if (!user || !isCorrectPassword) {
        res.status(401).send({ message: 'Invalid email or password' });
        return;
      }

      const payload = { id: user.id, role: user.role.name };
      const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRATION,
      });
      const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRATION,
      });
      await prisma.refreshToken.create({
        data: { string: refreshToken, user: { connect: { id: user.id } } },
      });

      res.send({ ...payload, accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  async refresh(req: Request<object, object, RefreshToken>, res: Response) {
    try {
      if (!req.prisma) throw new Error("Can't access prisma middleware");

      const { prisma } = req;
      const { refreshToken } = req.body;

      const savedToken = await req.prisma.refreshToken.findFirst({
        where: { string: { equals: refreshToken } },
      });

      if (!savedToken?.isValid) {
        res.sendStatus(403);
        return;
      }

      jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (error, payload) => {
        if (error || !payload || typeof payload === 'string') {
          res.sendStatus(403);
          return;
        }

        const user = { id: payload.id, role: payload.role };
        const newAccessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, {
          expiresIn: ACCESS_TOKEN_EXPIRATION,
        });
        const newRefreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET, {
          expiresIn: REFRESH_TOKEN_EXPIRATION,
        });

        await prisma.refreshToken.update({
          data: { isValid: false },
          where: { string: refreshToken },
        });
        await prisma.refreshToken.create({
          data: {
            string: newRefreshToken,
            user: { connect: { id: user.id } },
          },
        });

        res.send({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });
      });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },
};
