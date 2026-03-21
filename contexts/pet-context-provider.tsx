"use client";

import { createContext, useOptimistic, useState } from "react";
import type { Pet } from "@/lib/types";
import { toast } from "sonner";
import { addPet, deletePet, editPet } from "@/actions/actions";

type TPetContext = {
  // pets: Pet[];
  optimisticPets: Pet[];
  selectedPetId: Pet["id"] | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleChangeSelectedPetId: (id: Pet["id"] | null) => void;
  handleCheckoutPet: (id: Pet["id"]) => Promise<void>;
  handleAddPet: (newPet: Omit<Pet, "id">) => Promise<void>;
  handleEditPet: (petId: string, updatedPet: Omit<Pet, "id">) => Promise<void>;
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
  // const [pets, setPets] = useState<Pet[]>(data);
  const [selectedPetId, setSelectedPetId] = useState<Pet["id"] | null>(null);
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, { ...payload, id: `temp-id-${Date.now()}` }];
        case "edit":
          return state.map((pet) =>
            pet.id === payload.petId ? { ...pet, ...payload.updatedPet } : pet
          );
        case "delete":
          return state.filter((pet) => pet.id !== payload);
        default:
          return state;
      }
    }
  );

  // Derived State
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  // Handlers
  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    // setOptimisticPets((prev) => [...prev, { ...newPet, id: `temp-id-${Date.now()}` }]);
    // setOptimisticPets(newPet);
    setOptimisticPets({ action: "add", payload: newPet });
    const error = await addPet(newPet);
    if (error) {
      toast.warning("Failed to add pet. Please try again.");
      return;
    }
  };
  const handleEditPet = async (petId: string, updatedPet: Omit<Pet, "id">) => {
    setOptimisticPets({ action: "edit", payload: { petId, updatedPet } });
    const error = await editPet(petId, updatedPet);
    if (error) {
    toast.warning(error.message);
    return;
    }
  };
  const handleCheckoutPet = async (petId: string) => {
    setOptimisticPets({ action: "delete", payload: petId });
    const error = await deletePet(petId);
    if (error) {
      toast.warning("Failed to checkout pet. Please try again.");
      return;
    }
    setSelectedPetId(null);
  };
  const handleChangeSelectedPetId = (id: Pet["id"] | null) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider value={{ 
      // pets,
      optimisticPets,
      selectedPetId,
      selectedPet,
      numberOfPets,
      handleChangeSelectedPetId,
      handleCheckoutPet,
      handleAddPet,
      handleEditPet,
    }}>
      {children}
    </PetContext.Provider>
  );
}
