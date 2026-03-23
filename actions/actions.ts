"use server";

import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function addPet(pet: unknown) {
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

export async function editPet(petId: unknown, pet: unknown) {
  await sleep(1000);
  
  const parsedPet = petFormSchema.safeParse(pet);
  const parsedPetId = petIdSchema.safeParse(petId);
  if (!parsedPet.success || !parsedPetId.success) {
    return {
      message: "Invalid pet data",
      error: parsedPet.error,
    }
  }

  try {
    await prisma.pet.update({
      where: { id: parsedPetId.data },
      data: parsedPet.data,
    });
  } catch (error) {
    return {
      message: "Failed to edit pet",
      error: (error as Error).message,
    }
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(petId: unknown) {
  await sleep(1000);

  const parsedPetId = petIdSchema.safeParse(petId);
  if (!parsedPetId.success) {
    return {
      message: "Invalid pet ID",
      error: parsedPetId.error,
    }
  }

  try {
    await prisma.pet.delete({
      where: { id: parsedPetId.data },
    });
  } catch (error) {
    return {
      message: "Failed to delete pet",
      error: (error as Error).message,
    }
  }

  revalidatePath("/app", "layout");
}
