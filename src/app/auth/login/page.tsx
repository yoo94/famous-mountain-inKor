'use client';

import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // useSession 훅으로 세션 정보 가져오기
  const { status } = useSession();

  // 세션 상태 확인 및 로그인 후 루트 페이지로 이동
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/'); // 이미 로그인된 상태면 루트 페이지로 이동
    }
  }, [status, router]);

  const handleLogin = async () => {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/',
    });

    if (result?.error) {
      alert('로그인 실패: ' + result.error);
    } else if (result?.url) {
      router.push(result.url); // 로그인 성공 시 해당 URL로 이동
    }
  };

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/' });
  };

  const goToRegister = () => {
    router.push('/auth/register');
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 text-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-4">로그인</h2>
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full p-3 mt-4 font-bold text-white bg-green-600 rounded-lg hover:bg-green-500"
        >
          로그인
        </button>
        <button
          onClick={handleGoogleLogin}
          className="w-full p-3 mt-4 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500"
        >
          Google로 로그인
        </button>
        <button
          onClick={goToRegister}
          className="w-full p-3 mt-4 font-bold text-white bg-yellow-600 rounded-lg hover:bg-yellow-500"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
