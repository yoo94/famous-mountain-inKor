'use client';
import MountainList from "@/app/components/mountain-list";
import SearchMountain from "@/app/components/mountain-search";
import { useState } from 'react';

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);  // 검색어 상태 업데이트
  };

  return (

    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-green-950">한국의 100대 명산</h1>
      <SearchMountain onSearch={handleSearch} />
      <MountainList searchTerm={searchTerm} />
    </div>
  );
}
