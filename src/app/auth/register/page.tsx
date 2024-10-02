'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js Router를 import합니다.

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // useRouter 훅을 사용하여 라우터를 설정합니다.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, password }),
    });

    if (res.ok) {
      // 회원가입 성공 시 로그인 페이지로 리다이렉트
      console.log('User registered successfully');
      router.push('/auth/login'); // 로그인 페이지로 리다이렉트합니다.
    } else {
      const data = await res.json();
      if (data.error.code === "P2002") {
        setError(data.error.meta.target[0] + "이 이미 존재합니다.");
      } else {
        setError(data.error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 text-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg"
      >
        <h1 className="text-3xl font-bold text-center text-green-800 mb-4">회원가입</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
        />
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
        />
        <button
          type="submit"
          className="w-full p-3 font-bold text-white bg-green-600 rounded-lg hover:bg-green-500"
        >
          회원가입
        </button>

        <div className="text-center mt-4">
          <p className="text-gray-600">이미 계정이 있으신가요?</p>
          <button
            type="button"
            onClick={() => router.push('/auth/login')} // 로그인 페이지로 이동
            className="text-green-600 underline hover:text-green-500"
          >
            로그인하러 가기
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
