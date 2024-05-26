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

// authRouter.post('/login', authController.logIn);
// authRouter.post('/confirm', authController.confirm);
// authRouter.post('/logout', authController.logOut);
// authRouter.get('/refresh', authController.refreshSession);
