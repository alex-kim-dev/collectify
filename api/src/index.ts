import express, { type Request } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({ path: '.env.local' });
const { PORT, CLIENT_URL } = process.env;

const corsOptions = {
  origin: CLIENT_URL,
};

const app = express();

app.get(
  '/',
  cors(corsOptions),
  (req: Request<null, object, null, null>, res) => {
    res.send({ up: true });
  },
);

app.listen(PORT, () => {
  console.log(`Express app is listening at port ${PORT}`);
});
