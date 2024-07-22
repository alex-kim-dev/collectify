import { z } from 'zod';

import {
  NAME_LENGTH_MAX,
  PW_LENGTH_MAX,
  PW_LENGTH_MIN,
  PW_SPECIAL_CHARS,
} from '~/lib/constants';

const signIn = z.object({
  email: z.string().min(1, 'Email is required').email('Email must be valid'),
  password: z
    .string()
    .min(
      PW_LENGTH_MIN,
      `Password must be at least ${PW_LENGTH_MIN} characters long`,
    )
    .max(
      PW_LENGTH_MAX,
      `Password must be at most ${PW_LENGTH_MAX} characters long`,
    ),
});

const signUp = z
  .object({
    email: z.string().min(1, 'Email is required').email('Email must be valid'),
    name: z
      .string()
      .max(
        NAME_LENGTH_MAX,
        `Name must be at most ${NAME_LENGTH_MAX} characters long`,
      )
      .optional(),
    password: signIn.shape.password
      .regex(/[a-z]/, 'Password must have at least 1 latin lowercase character')
      .regex(/[A-Z]/, 'Password must have at least 1 latin uppercase character')
      .regex(/\d/, 'Password must have at least 1 number')
      .regex(
        new RegExp(`[${PW_SPECIAL_CHARS}]`),
        `Password must have at least 1 character from ${PW_SPECIAL_CHARS}`,
      ),
    passwordConfirm: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords must match',
  });

export const schema = { signIn, signUp };
