"use client";

import { useState } from "react";
import { useSearchContext } from "@/lib/hooks";

export default function SearchForm() {
  const { searchQuery, handleQueryChange } = useSearchContext();
  
  return (
    <form
      className="w-full h-full shadow"
    >
      <input
        className="w-full h-full bg-white/20 rounded-md shadow p-2 focus:bg-white/50 hover:bg-white/30 placeholder:text-white/50 transition"
        type="text"
        placeholder="Search pets..."
        value={searchQuery}
        onChange={(e) => handleQueryChange(e.target.value)}
        />
    </form>
  );
}
