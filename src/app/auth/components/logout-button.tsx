"use client";

import { signOut } from "next-auth/react";
import React from "react";

const LogoutButton = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // 로그아웃 후 리디렉션할 URL 지정
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
