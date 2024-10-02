// components/header.tsx
'use client';

import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { SquareChevronDown, SquareChevronUp } from 'lucide-react';
import Link from 'next/link';

const menu = [
    { title: '홈', href: '/' },
    { title: '날씨정보', href: '/menu/2' },
    { title: '교통 & 시설정보', href: '/menu/3' },
];

export default function Header() {
    const { data: session } = useSession(); // 세션 정보 가져오기
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-green-600 text-white shadow-md py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                <h1 className="text-2xl font-bold tracking-wide">Famous Mountain KOR</h1>
                <button
                    onClick={toggleMenu}
                    className="text-white transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white"
                >
                    {isOpen ? <SquareChevronUp className="w-8 h-8" /> : <SquareChevronDown className="w-8 h-8" />}
                </button>
            </div>
            {isOpen && (
                <nav className="mt-2 bg-green-700 transition-all duration-500 ease-in-out text-center">
                    <ul className="flex flex-col items-center space-y-3 py-3">
                        {menu.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href} className="text-lg font-medium hover:underline hover:text-green-300 transition-colors duration-200">
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                        {session && (
                            <li>
                                <button
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="text-lg font-medium hover:underline hover:text-red-300 transition-colors duration-200"
                                >
                                    로그아웃
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            )}
        </header>
    );
}
