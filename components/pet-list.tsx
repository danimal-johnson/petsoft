"use client";

import Image from "next/image";
import { usePetContext } from "@/lib/hooks";
import { useSearchContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Pet } from "@/lib/types";

export default function PetList() {
  const { selectedPetId, handleChangeSelectedPetId } = usePetContext();
  const { optimisticPets } = usePetContext();
  const { searchQuery } = useSearchContext();

  const filteredPets: Pet[] = optimisticPets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ul className="bg-white border-b border-light">
      {filteredPets.map((pet) => (
        <li key={pet.id}>
          <button
            className={cn("flex h-17.5 w-full items-center px-4 cursor-pointer text-base hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition",
              {
                "bg-[#EFF1F2]" : selectedPetId === pet.id,
              }
            )}
            onClick={() => handleChangeSelectedPetId(pet.id)}
          >
            <Image
              src={pet.imageUrl || "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png"}
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
  );
}
