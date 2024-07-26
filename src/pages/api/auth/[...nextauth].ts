import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { type AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

import { env } from '~/env';
import { db } from '~/server/db';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),

  providers: [
    GitHubProvider({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
  ],

  session: {
    strategy: 'database',
  },

  debug: env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);
