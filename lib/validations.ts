import { z } from "zod";
import { DEFAULT_PET_IMAGE_URL } from "./constants";

export const petIdSchema = z.string("Pet ID must be a string");

export const petFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  ownerName: z.string().trim().min(1, "Owner name is required"),
  imageUrl: z.union([
    z.literal(""),
    z.string().trim().url("Image must be a valid URL"),
  ]),
  age: z.preprocess(
    (value) => {
      if (value === "") return undefined; // allow empty string to be treated as undefined
      return value;
    },
    z.number({
      error: (issue) => {
        if (issue.input === undefined) return "Age is required";
        return "Age must be a number";
      }
    })
    .min(0, "Age must be a positive number")
    .max(200, "Age must be less than 200")
  ),
  notes: z.union([
    z.literal(""),
    z.string().trim().max(1000),
  ]),
}).transform((data) => ({
  ...data,
  imageUrl: data.imageUrl || DEFAULT_PET_IMAGE_URL,
}));

export type PetFormInput = z.input<typeof petFormSchema>;
export type PetFormOutput = z.output<typeof petFormSchema>;
export type TPetForm = z.infer<typeof petFormSchema>;

export const authSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().max(100),
});

export type TAuth = z.infer<typeof authSchema>;