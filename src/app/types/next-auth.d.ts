import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // 사용자 ID 추가
      name?: string | null;
      email?: string | null;
      image?: string | null;
      userid?: string; // Google ID 추가
    };
  }

  interface Profile {
    email_verified?: boolean;
    sub?: string; // Google에서 제공하는 고유 ID 추가
  }

  interface User {
    id: string; // 사용자 ID 필드 추가
    name?: string | null;
    email?: string | null;
    image?: string | null;
    userid?: string; // Google ID 추가
  }
}
