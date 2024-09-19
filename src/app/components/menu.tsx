'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { SquareChevronDown, SquareChevronUp } from 'lucide-react';

// 타입 정의
type SubSubMenuItem = {
    title: string;
    href: string;
};

type SubMenuItem = {
    title: string;
    subSubMenu: SubSubMenuItem[];
};

type MenuItemWithSubMenu = {
    title: string;
    subMenu: SubMenuItem[];
};

type MenuItemWithHref = {
    title: string;
    href: string;
};

type MenuItem = MenuItemWithSubMenu | MenuItemWithHref;

const menu: MenuItem[] = [
    {
        title: '홈',
        href: '/',
    },
    {
        title: '날씨정보',
        href: '/menu/2',
    },
    {
        title: '교통 & 시설정보',
        href: '/menu/3',
    },
];

// 타입 가드 함수
const isMenuItemWithSubMenu = (menu: MenuItem): menu is MenuItemWithSubMenu => {
    return 'subMenu' in menu;
};

const HamburgerMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null);
    const [activeSubSubMenu, setActiveSubSubMenu] = useState<number | null>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const toggleSubMenu = (index: number) => {
        if (activeSubMenu === index) {
            setActiveSubMenu(null);
            setActiveSubSubMenu(null);
        } else {
            setActiveSubMenu(index);
            setActiveSubSubMenu(null);
        }
    };

    const toggleSubSubMenu = (index: number) => {
        if (activeSubSubMenu === index) {
            setActiveSubSubMenu(null);
        } else {
            setActiveSubSubMenu(index);
        }
    };

    return (
        <div className="relative">
            {/* 헤더 섹션 및 아이콘 전환 */}
            <div className="flex items-center p-4 bg-green-300 border-b">
                <button onClick={toggleMenu} aria-label="Toggle menu">
                    <SquareChevronDown className="w-6 h-6 mr-3" />
                </button>
                <span className="text-xl font-bold">FMK</span>
            </div>

            {/* 메뉴가 열렸을 때만 보이는 메뉴 목록 */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex flex-col bg-white">
                    <ul className="flex flex-col space-y-2 p-4">
                        <button onClick={toggleMenu} aria-label="Toggle menu">
                            <SquareChevronUp className="w-6 h-6" />
                            <span className="text-xl font-bold">FAMOUS MOUNTAIN KOR</span>

                        </button>
                        {menu.map((menu, index) => (
                            <li key={index}>
                                {isMenuItemWithSubMenu(menu) ? (
                                    <div>
                                        <button
                                            className="w-full rounded-md p-2 text-left text-gray-700 hover:bg-gray-100"
                                            onClick={() => toggleSubMenu(index)}
                                        >
                                            {menu.title}
                                        </button>
                                        {activeSubMenu === index && (
                                            <ul className="ml-4 mt-2 space-y-2">
                                                {menu.subMenu.map((subMenuItem, subIndex) => (
                                                    <li key={subIndex}>
                                                        <div>
                                                            <button
                                                                className="w-full rounded-md p-2 text-left text-gray-600 hover:bg-gray-200"
                                                                onClick={() => toggleSubSubMenu(subIndex + index * 100)}
                                                            >
                                                                {subMenuItem.title}
                                                            </button>
                                                            {activeSubSubMenu === subIndex + index * 100 && (
                                                                <ul className="ml-4 mt-2 space-y-2">
                                                                    {subMenuItem.subSubMenu.map((subSubMenuItem, subSubIndex) => (
                                                                        <li key={subSubIndex}>
                                                                            <Link href={subSubMenuItem.href} onClick={closeMenu}>
                                                                                <span className="block rounded-md p-2 text-gray-500 hover:bg-gray-300">
                                                                                    {subSubMenuItem.title}
                                                                                </span>
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ) : (
                                    <Link href={menu.href} onClick={closeMenu}>
                                        <span className="block rounded-md p-2 text-gray-700 hover:bg-gray-100">
                                            {menu.title}
                                        </span>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HamburgerMenu;
