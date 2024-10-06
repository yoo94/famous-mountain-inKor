"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useSession } from 'next-auth/react';

interface ChatMessage {
  id: number;
  room: string;
  text: string;
  createdAt: string;
  userEmail: string;
}

interface ChatRoomProps {
  roomId: string; // 방 ID
}

const ChatRoom: React.FC<ChatRoomProps> = ({ roomId }) => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    // 세션이 유효한지 확인
    if (!session) {
      return; // 로그인하지 않은 경우 처리
    }

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages') // 소문자 사용
        .select('*')
        .eq('room', roomId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data as ChatMessage[]);
      }
    };

    fetchMessages();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const newMessage = payload.new as ChatMessage;
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    // Clean up on unmount
    return () => {
      subscription.unsubscribe(); // 구독 해제
    };
  }, [roomId, session]);

  const handleSendMessage = async () => {
    if (input.trim() !== '' && session) {
      const { error } = await supabase
        .from('messages') // 소문자 사용
        .insert([{ room: roomId, text: input, userEmail: session.user?.email || 'guest@example.com' }]); // 현재 사용자 이메일을 추가

      if (error) {
        console.error('Error sending message:', error);
      }
      setInput(''); // 입력 필드 초기화
    }
  };

  return (
    <div className="chat-room">
      <div className="border border-gray-300 p-4 mb-4 h-64 overflow-y-auto text-black">
        {messages.map((message) => (
          <div key={message.id} className="mb-2 p-2 bg-gray-200 rounded text-black">
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="flex-grow border border-gray-300 p-2 rounded-l text-black"
        />
        <button
          onClick={handleSendMessage}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded-r hover:bg-green-600 transition duration-200"
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
