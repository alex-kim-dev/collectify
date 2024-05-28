import { Router } from 'express';

import { authController } from '~/controllers';
import { validate } from '~/middleware/validate';
import { schema } from '~/schemas';

export const authRouter = Router();

authRouter.post(
  '/register',
  validate(schema.register),
  authController.register,
);

authRouter.post('/refresh', validate(schema.refresh), authController.refresh);
