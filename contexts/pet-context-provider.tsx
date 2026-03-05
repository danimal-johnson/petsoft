"use client";

import { createContext, useState } from "react";
import { Pet } from "@/lib/types";

type TPetContext = {
  pets: Pet[];
  selectedPetId: Pet["id"] | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleSelectedPetId: (id: Pet["id"] | null) => void;
};

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({ data, children }:
  PetContextProviderProps)
{
  // State
  const [pets, setPets] = useState<Pet[]>(data);
  const [selectedPetId, setSelectedPetId] = useState<Pet["id"] | null>(null);
  
  // Derived State
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  // Handlers
  const handleSelectedPetId = (id: Pet["id"] | null) => {
    setSelectedPetId(id);
  };

  return (
    // <PetContext.Provider value={{ pets, selectedPetId, setPets, setSelectedPetId }}>
    <PetContext.Provider value={{ 
      pets,
      selectedPetId,
      selectedPet,
      numberOfPets,
      handleSelectedPetId
    }}>
      {children}
    </PetContext.Provider>
  );
}
