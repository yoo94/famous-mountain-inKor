"use client";

import ChatRoom from '@/app/details/components/ChatRoom';

interface ChatRoomPageProps {
  params: { id: string };
}

const ChatRoomPage = ({ params }: ChatRoomPageProps) => {
  const { id } = params;
  const name = new URLSearchParams(window.location.search).get('name'); // URL 쿼리에서 name 가져오기

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-black font-bold mb-4 text-center"> {name} 실시간 채팅방</h1>
      <ChatRoom roomId={id} /> {/* 채팅 UI 컴포넌트 사용 */}
    </div>
  );
};

export default ChatRoomPage;
