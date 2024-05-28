import { Router } from 'express';

import { authController } from '~/controllers';
import { validate, authenticate } from '~/middleware';
import { schema } from '~/schemas';

export const authRouter = Router();

authRouter.post(
  '/register',
  validate(schema.register),
  authController.register,
);
authRouter.post('/login', validate(schema.login), authController.logIn);
authRouter.post(
  '/logout',
  authenticate,
  validate(schema.logout),
  authController.logOut,
);
authRouter.post('/refresh', validate(schema.refresh), authController.refresh);
