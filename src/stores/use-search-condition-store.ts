import { create } from 'zustand';

interface SearchCondition {
  searchTerm: string;
  searchBy: string;
  searchPage: number;
  setSearchTerm: (searchTerm: string) => void;
  setSearchBy: (searchBy: string) => void;
  setSearchPage: (searchPage: number) => void;
}

export const useSearchStore = create<SearchCondition>((set) => ({
  searchTerm: '',
  searchBy: 'name',
  searchPage: 1,
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
  setSearchBy: (searchBy: string) => set({ searchBy }),
  setSearchPage: (searchPage: number) => set({ searchPage }),
}));
