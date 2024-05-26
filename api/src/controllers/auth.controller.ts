import { type Response, type Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { type RegisterCredentials } from '~/schemas';

export const authController = {
  async register(
    req: Request<object, object, RegisterCredentials, object>,
    res: Response<object, object>,
  ) {
    try {
      if (!req.prisma) throw new Error("Can't access prisma middleware");

      const { email, name, password } = req.body;
      const existingUser = await req.prisma.user.findFirst({
        where: { email },
      });

      if (existingUser) {
        res
          .status(409)
          .send({ message: 'A user with this email already exists' });
        return;
      }

      const hashedPassword = await bcrypt.hash(
        password,
        process.env.SALT_ROUNDS as string,
      );
      const user = await req.prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role: { connect: { name: 'USER' } },
        },
        select: { id: true, role: { select: { name: true } } },
      });

      const token = jwt.sign(user, process.env.TOKEN_SECRET as string);
      // TODO make a record in the token table

      res.status(201).send({ ...user, accessToken: token });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  },
};
