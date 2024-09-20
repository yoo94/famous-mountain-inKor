// components/SearchMountain.tsx
'use client';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useSearchStore } from '@/stores/use-search-condition-store';
import React from 'react';

export default function SearchMountain() {
  const { searchTerm, searchBy, setSearchTerm, setSearchBy, setSearchPage } = useSearchStore();  // setSearchPage 추가

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSearchPage(1);  // 검색 시 페이지를 1로 변경
  };

  const handleOptionChange = (value: 'name' | 'city') => {
    setSearchBy(value);
    setSearchPage(1);  // 검색 기준 변경 시 페이지를 1로 변경
  };

  return (
    <div className="relative mx-auto w-full p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-green-800 mb-4">검색 기준 선택</h2>
      <RadioGroup className="mb-4 space-y-2">
        <div className="flex items-center space-x-3">
          <RadioGroupItem
            value="name"
            id="name"
            checked={searchBy === 'name'}
            onClick={() => handleOptionChange('name')}
            className="text-green-600 focus:ring-green-600"
          />
          <Label htmlFor="name" className="text-sm text-gray-700">명산 이름</Label>
        </div>
        <div className="flex items-center space-x-3">
          <RadioGroupItem
            value="city"
            id="city"
            checked={searchBy === 'city'}
            onClick={() => handleOptionChange('city')}
            className="text-green-600 focus:ring-green-600"
          />
          <Label htmlFor="city" className="text-sm text-gray-700">시도명</Label>
        </div>
      </RadioGroup>

      <input
        className="text-green-800 h-12 w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        style={{ fontSize: '16px' }}
        placeholder={searchBy === 'name' ? '명산 이름으로 검색...' : '시도명으로 검색...'}
        type="search"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}
