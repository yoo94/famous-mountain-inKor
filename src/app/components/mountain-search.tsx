'use client';
import React from 'react';

type SearchMountainProps = {
  onSearch: (searchTerm: string) => void;
};

export default function SearchMountain({ onSearch }: SearchMountainProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <form className="relative mx-auto w-full max-w-md">
      <input
        className="flex  text-green-950 h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
        placeholder="명산 검색..."
        type="search"
        onChange={handleInputChange}
      />
    </form>
  );
}
