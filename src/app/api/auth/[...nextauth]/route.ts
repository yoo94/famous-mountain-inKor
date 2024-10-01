import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prismaClient';

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ profile }) {
      const { sub: userid, name, email, picture } = profile || {};
  
      if (!email) {
        return false; // 이메일이 없으면 로그인 실패
      }
  
      // Supabase의 User 테이블에 사용자 데이터 저장
      await prisma.user.upsert({
        where: { email }, // 이메일을 통해 사용자 확인
        update: {
          name: name || null,
          image: picture || null,
          userid: userid || null, // 구글에서 제공하는 고유 ID 저장
        },
        create: {
          name: name || null,
          email,
          image: picture || null,
          userid: userid || null, // 여기서도 userid 사용
        },
      });
      return true;
    },
    async session({ session, user }) {
      session.user.id = user.id; // 타입 충돌 방지
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
