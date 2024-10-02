import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prismaClient';
import bcrypt from 'bcrypt';
import { JWT } from 'next-auth/jwt';

// 커스텀 타입 정의
interface CustomJWT extends JWT {
  id?: string;
  email?: string | null;
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Credentials are required');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error('User not found or password is missing');
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);

        if (!isValidPassword) {
          throw new Error('Invalid password');
        }

        return { id: user.id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      const customToken = token as CustomJWT;

      if (user) {
        customToken.id = user.id.toString();
        customToken.email = user.email;
        customToken.name = user.name;
      }
      return customToken;
    },
    async session({ session, token }) {
      const customToken = token as CustomJWT;

      if (customToken) {
        session.user.id = customToken.id || '';
        session.user.email = customToken.email || '';
        session.user.name = customToken.name || '';
      }
      return session;
    },
    async redirect({ baseUrl }) {
      // 로그인 후 루트로 이동하도록 리다이렉트 설정
      return baseUrl; // baseUrl이 루트 경로를 나타냄 (예: 'http://localhost:3000/')
    },
  },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
