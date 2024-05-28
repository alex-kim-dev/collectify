import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import { prisma } from '~/middleware';
import { authRouter } from '~/routes';

dotenv.config();
const { PORT, CLIENT_URL } = process.env;

const app = express();

app.use(cors({ origin: CLIENT_URL }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(prisma);

app.get('/status', (req, res) => res.send({ up: true }));
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Express app is listening at port ${PORT}`);
});
