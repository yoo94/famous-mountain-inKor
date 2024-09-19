// components/Pagination.tsx
'use client';
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchStore } from '@/stores/use-search-condition-store';
import React from 'react';

export default function Pagination() {
  const { searchPage, setSearchPage } = useSearchStore();
  const totalPages = 5;

  const handlePageChange = (page: number) => {
    setSearchPage(page);
  };

  return (
    <PaginationContent className="flex items-center justify-center mr-auto">
      <PaginationItem>
        <PaginationPrevious
          href="#"
          className="text-green-950 hover:bg-green-200 px-4 py-2 rounded-md transition"
          onClick={() => handlePageChange(Math.max(searchPage - 1, 1))}
        />
      </PaginationItem>

      {[...Array(totalPages)].map((_, i) => (
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            className={`${searchPage === i + 1 ? 'bg-green-600 text-white' : 'text-green-950 hover:bg-green-200'} px-4 py-2 rounded-md transition`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem>
        <PaginationNext
          href="#"
          className="text-green-950 hover:bg-green-200 px-4 py-2 rounded-md transition"
          onClick={() => handlePageChange(Math.min(searchPage + 1, totalPages))}
        />
      </PaginationItem>
    </PaginationContent>
  );
}
