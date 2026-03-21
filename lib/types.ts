import type { Pet as PrismaPet } from "@/lib/generated/prisma/client";

export type Pet = Omit<PrismaPet, "createdAt" | "updatedAt">;

// export type Pet = {
//     id: string;
//     name: string;
//     ownerName: string;
//     age: number;
//     imageUrl?: string;
//     notes: string;
// };
