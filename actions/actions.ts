"use server";

import prisma from "@/lib/db";
import { Pet } from "@/lib/generated/prisma/browser";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function addPet(pet: Omit<Pet, "id" | "createdAt" | "updatedAt">) {
  await sleep(2000);

  try {
    await prisma.pet.create({
      data: pet,
    });
  } catch (error) {
    return {
      message: "Failed to add pet",
      error: (error as Error).message,
    }
  }

  revalidatePath("/app", "layout");
}

export async function editPet(petId: string, pet: Omit<Pet, "id" | "createdAt" | "updatedAt">) {
  await sleep(2000);
  
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

export async function deletePet(petId: string) {
  await sleep(2000);

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
