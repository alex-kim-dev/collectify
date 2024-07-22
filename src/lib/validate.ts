import { z } from 'zod';

import { PW_LENGTH_MAX, PW_LENGTH_MIN } from '~/lib/constants';

const signIn = z.object({
  email: z.string().email('Email is required'),
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

export const schema = { signIn };
