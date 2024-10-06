"use client";

import { useRouter } from 'next/navigation';
import React from 'react';

interface RealTimeChatButtonProps {
  frtrlNm: string; 
  name: string; 
}

const RealTimeChatButton: React.FC<RealTimeChatButtonProps> = ({ frtrlNm,name }) => {
  const router = useRouter();
  
  const handleChatButtonClick = () => {
    router.push(`/chat/${frtrlNm}?name=${encodeURIComponent(name)}`);
  };

  return (
    <div className="text-center mb-4">
      <button
        onClick={handleChatButtonClick}
        className="bg-green-500 text-black font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-200"
      >
        실시간 채팅
      </button>
    </div>
  );
};

export default RealTimeChatButton;
