"use client";

import Image from "next/image";
import { Pet } from "@/lib/types";
import { usePetContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export default function PetList() {
  const { pets, selectedPetId, handleSelectedPetId } = usePetContext();
  return (
    <ul className="bg-white border-b border-light">
      {pets.map((pet) => (
        <li key={pet.id}>
          <button
            className={cn("flex h-17.5 w-full items-center px-4 cursor-pointer text-base hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition",
              {
                "bg-[#EFF1F2]" : selectedPetId === pet.id,
              }
            )}
            onClick={() => handleSelectedPetId(pet.id)}
          >
            <Image
              src={pet.imageUrl}
              alt="Pet Image"
              width={45}
              height={45}
              className="w-[45px] h-[45px] rounded-full object-cover mr-3"
            />
            {pet.name}
          </button>
        </li>
      ))}
    </ul>
      )
}
