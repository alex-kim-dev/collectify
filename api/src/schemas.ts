import { z } from 'zod';

export const schema = {
  register: z.object({
    body: z.object({
      email: z
        .string({ required_error: 'Email is required' })
        .email('Email should be valid'),
      name: z
        .string({ required_error: 'Name is required' })
        .min(1, 'Name must be at least 1 character long'),
      password: z
        .string({ required_error: 'Password is required' })
        .min(6, 'Passworld should be at least 6 characters long')
        .regex(
          /^[a-z\d!@#$%^&*]+$/i,
          'Password should contain alphanumeric characters or symbols: !@#$%^&*',
        ),
    }),
  }),
};

export type RegisterCredentials = z.infer<typeof schema.register>['body'];
