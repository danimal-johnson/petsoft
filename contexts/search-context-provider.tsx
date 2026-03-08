"use client";

import { createContext, useState } from "react";

type TSearchContext = {
  searchQuery: string;
  handleQueryChange: (value: string) => void;
};

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({ children }:
  SearchContextProviderProps)
{
  // State
  const [input, setInput] = useState<string>("");

  // Handlers
  const handleQueryChange = (value: string) => {
    setInput(value);
  };

  return (
    // <PetContext.Provider value={{ pets, selectedPetId, setPets, setSelectedPetId }}>
    <SearchContext.Provider value={{ 
      searchQuery: input,
      handleQueryChange
    }}>
      {children}
    </SearchContext.Provider>
  );
}