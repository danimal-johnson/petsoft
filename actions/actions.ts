"use server";

import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
// import { signIn } from "next-auth";
import { auth, signIn } from "@/lib/auth";

// === User Actions ===

export async function logIn(formData: FormData) {
  console.log(formData);
  const authData = Object.fromEntries(formData.entries());
  const { email, password } = authData;
  console.log({ email, password });

  await signIn("credentials", { 
    email,
    password,
    redirect: true,
    callbackUrl: "/app/dashboard"
  }); // authData
}

export async function signUp(formData: FormData) {
  const authData = Object.fromEntries(formData.entries());
  const { email, password } = authData;
  const hashedPassword = await bcrypt.hash(password as string, 10);
  console.log({ email, password, hashedPassword });

  await prisma.user.create({
    data: {
      email: email as string,
      hashedPassword,
    },
  });

  // await signUp("credentials", { email, hashedPassword }); // authData
}

// === Pet Actions ===

export async function addPet(pet: unknown) {
  await sleep(1000);

  const session = await auth();
  if (!session?.user?.id) {
    return {
      message: "Unauthorized",
      error: "User not authenticated",
    }
  }

  const parsedPet = petFormSchema.safeParse(pet);
  if (!parsedPet.success) {
    return {
      message: "Invalid pet data",
      error: parsedPet.error,
    }
  }

  try {
    await prisma.pet.create({
      data: {
        ...parsedPet.data,
        userId: session.user.id,
      },
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
      data: {
        ...parsedPet.data,
      },
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
