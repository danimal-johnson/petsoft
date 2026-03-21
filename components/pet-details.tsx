"use client";

import { usePetContext } from "@/lib/hooks";
import Image from "next/image";
import { Pet } from "@/lib/types";
import PetButton from "./pet-button";
import { deletePet } from "@/actions/actions";
import { startTransition, useTransition } from "react";

export default function PetDetails() {
  const { selectedPet } = usePetContext();
  
  return (
    selectedPet == null ? (
      <div className="w-full h-full flex items-center justify-center">
        <p className="font-semibold text-2xl">No pet selected</p>
      </div>
    ) : (
    <section className="flex flex-col w-full h-full">
      <TopBar pet={selectedPet} />
      <Details pet={selectedPet} />
      <Notes pet={selectedPet} />
    </section>
    )
  )
}
function TopBar({ pet }: { pet: Pet }) {
  const { handleCheckoutPet } = usePetContext();
  const [isPending, startTransition] = useTransition();
  console.log("Selected pet in TopBar:", pet);
  return (
    <div className="flex items-center bg-white px-8 py-5 border-b border-light">
      <Image
        src={pet?.imageUrl || "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png" }
        alt="Pet Image"
        width={75} height={75}
        className="h-[75px] w-[75px] object-cover rounded-full"
      />
      <h2 className="text-3xl font-semibold leading-7 ml-5">{pet?.name}</h2>

      <div className="ml-auto flex items-center gap-3">
        <PetButton actionType="edit">Edit</PetButton>
        <PetButton
          actionType="checkout"
          disabled={isPending}
          onClick={async () => {
              await handleCheckoutPet(pet.id);
          }}
        >
            Checkout
        </PetButton>
      </div>
    </div>
  );
}

function Details({ pet }: { pet: Pet }) {
  return (
      <div className="flex justify-around py-10 px-5 text-center">
        <div>
          <h3 className="text-[13px] font-medium uppercase text-zinc-700">Owner name</h3>
          <p className="mt-1 text-sm text-gray-500">{pet.ownerName}</p>
        </div>
        <div>
          <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
          <p className="mt-1 text-sm text-gray-500">{pet.age} years</p>
        </div>
      </div>
  );
}

function Notes({ pet }: { pet?: Pet }) {
  return (
    <section className="flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-8 border border-light">
      <h3 className="text-[13px] font-medium uppercase text-zinc-700">Notes</h3>
      <p className="mt-1 text-sm text-gray-500">{pet?.notes}</p>
    </section>
  );
}