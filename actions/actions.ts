"use server";

import prisma from "@/lib/db";
import type { Pet } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { petFormSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function addPet(pet: Omit<Pet, "id">) {
  await sleep(1000);

  const parsedPet = petFormSchema.safeParse(pet);
  if (!parsedPet.success) {
    return {
      message: "Invalid pet data",
      error: parsedPet.error,
    }
  }

  try {
    await prisma.pet.create({
      data: parsedPet.data,
    });
  } catch (error) {
    return {
      message: "Failed to add pet",
      error: (error as Error).message,
    }
  }

  revalidatePath("/app", "layout");
}

export async function editPet(petId: Pet['id'], pet: Omit<Pet, "id">) {
  await sleep(1000);
  
  try {
    await prisma.pet.update({
      where: { id: petId },
      data: pet,
    });
  } catch (error) {
    return {
      message: "Failed to edit pet",
      error: (error as Error).message,
    }
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(petId: Pet['id']) {
  await sleep(1000);

  try {
    await prisma.pet.delete({
      where: { id: petId },
    });
  } catch (error) {
    return {
      message: "Failed to delete pet",
      error: (error as Error).message,
    }
  }

  revalidatePath("/app", "layout");
}
