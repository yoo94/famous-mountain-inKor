import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'; // Google Provider 추가
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
    // 기존 CredentialsProvider 설정
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

    // 새로 추가된 GoogleProvider 설정
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      const customToken = token as CustomJWT;


      if (user && account?.provider === 'google') {
        const email = user.email ?? undefined;
        if (email) {
          const existingUser = await prisma.user.findUnique({
            where: { email },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                email,
                name: user.name ?? '',
                password: null,
              },
            });
          }
        }
      }


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
      return baseUrl;
    },
  },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
