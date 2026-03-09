"use client";

import { createContext, useState } from "react";
import { Pet } from "@/lib/types";

type TPetContext = {
  pets: Pet[];
  selectedPetId: Pet["id"] | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleChangeSelectedPetId: (id: Pet["id"] | null) => void;
  handleCheckoutPet: (id: Pet["id"]) => void;
  handleAddPet: (newPet: Omit<Pet, "id">) => void;
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
  const handleAddPet = (newPet: Omit<Pet, "id">) => {
    setPets(prev => [...prev, { ...newPet, id: Date.now().toString() }]);
    console.log("Added new pet:", newPet);
  }
  const handleCheckoutPet = (id: Pet["id"]) => {
    setPets(prev => prev.filter(pet => pet.id !== id));
    setSelectedPetId(null);
  };
  const handleChangeSelectedPetId = (id: Pet["id"] | null) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider value={{ 
      pets,
      selectedPetId,
      selectedPet,
      numberOfPets,
      handleChangeSelectedPetId,
      handleCheckoutPet,
      handleAddPet,
    }}>
      {children}
    </PetContext.Provider>
  );
}
