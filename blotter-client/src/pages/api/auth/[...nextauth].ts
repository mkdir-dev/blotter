import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt_decode from 'jwt-decode';

import { routes } from '@/core/utils/routes';
import { API_URL } from '@/utils/config';
import { JwtPayloadResponse, TokensResponse } from '@/modules/auth/hooks/authhook.types';
import { refresh } from './refresh';

const refreshToken = async (token: string) => {
  const res = await refresh(token);

  if (res.ok) {
    const response: TokensResponse = await res.json();

    return response;
  }

  return {
    error: 'RefreshAccessTokenError',
  };
};

const providers = [
  CredentialsProvider({
    credentials: {
      email: { type: 'text' },
      password: { type: 'password' },
    },
    async authorize(credentials) {
      const response = await fetch(`${API_URL}${routes.signin.path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const user = await response.json();

      if (response.ok && user) {
        return { ...user, ...credentials };
      }

      return null;
    },
  }),
];

export const options: NextAuthOptions = {
  providers,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        // @ts-ignore
        const token_decode = (await jwt_decode(user.access_token)) as JwtPayloadResponse;

        // @ts-ignore
        token.access_token = user.access_token;
        // @ts-ignore
        token.accessTokenExpiry = user.accessTokenExpiry;
        // @ts-ignore
        token.refresh_token = user.refresh_token;
        // @ts-ignore
        token.refreshTokenExpiry = user.refreshTokenExpiry;
        token.name = token_decode.username;
        token.sub = token_decode.sub;
        token.role = token_decode.role;
      }

      // If the token is still valid, just return it.
      if (Date.now() < Number(token.accessTokenExpiry)) {
        return await Promise.resolve(token);
      }

      // @ts-ignore
      token = await refreshToken(token.refresh_token);

      // @ts-ignore
      const refresh_token_decode = (await jwt_decode(token.access_token)) as JwtPayloadResponse;

      token.name = refresh_token_decode.username;
      token.sub = refresh_token_decode.sub;
      token.role = refresh_token_decode.role;
      token.email = refresh_token_decode.email;

      return await Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.sub;
        session.user.email = token.email;
        session.user.name = token.name;
        // @ts-ignore
        session.user.role = token.role;
        // @ts-ignore
        session.user.accessTokenExpiry = token.accessTokenExpiry;
      }

      return await Promise.resolve(session);
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse<any>) => NextAuth(req, res, options);
