'use client';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React, { useState } from 'react';

type SearchMountainProps = {
  onSearch: (searchTerm: string, searchBy: 'name' | 'city') => void;
};

export default function SearchMountain({ onSearch }: SearchMountainProps) {
  const [searchBy, setSearchBy] = useState<'name' | 'city'>('name');
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value, searchBy);  // 검색어와 선택된 옵션을 전달
  };

  const handleOptionChange = (value: 'name' | 'city') => {
    setSearchBy(value);
    onSearch(searchTerm, value);  // 검색 기준 업데이트
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

      {/* 검색 입력 필드 */}
      <input
        className=" text-green-800 h-12 w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder={searchBy === 'name' ? '명산 이름으로 검색...' : '시도명으로 검색...'}
        type="search"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}
