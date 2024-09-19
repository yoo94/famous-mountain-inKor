'use client';
import MountainList from "@/app/components/mountain-list";
import SearchMountain from "@/app/components/mountain-search";
import { useState } from 'react';

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState<'name' | 'city'>('name'); // 검색 기준 상태 추가

  const handleSearch = (term: string, by: 'name' | 'city') => {
    setSearchTerm(term);
    setSearchBy(by);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-green-950">한국의 100대 명산</h1>
      <SearchMountain onSearch={handleSearch} />
      <MountainList searchTerm={searchTerm} searchBy={searchBy} />  {/* searchBy 추가 */}
    </div>
  );
}
