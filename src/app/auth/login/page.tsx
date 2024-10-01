'use client'

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/',
    });
  };

  const handleGoogleLogin = () => {
    signIn('google');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
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
      </div>
    </div>
  );
}
