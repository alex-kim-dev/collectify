import express, { type Request } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const { PORT, CLIENT_URL } = process.env;

const corsOptions = {
  origin: CLIENT_URL,
};

const app = express();
const prisma = new PrismaClient();

app.get(
  '/',
  cors(corsOptions),
  async (req: Request<null, object, null, null>, res) => {
    const {
      _count: { _all: n },
    } = await prisma.user.aggregate({ _count: { _all: true } });
    res.send({ up: true, numberOfUsers: n });
  },
);

app.listen(PORT, () => {
  console.log(`Express app is listening at port ${PORT}`);
});
