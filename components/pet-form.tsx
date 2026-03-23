"use client";

import { usePetContext } from "@/lib/hooks";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import PetFormButton from "./pet-form-btn";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

const petFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  ownerName: z.string().trim().min(1, "Owner name is required"),
  imageUrl: z.union([
    z.literal(""),
    z.string().trim().url("Image must be a valid URL"),
  ]),
  age: z.coerce.number()
    .min(0, "Age must be a positive number")
    .max(200, "Age must be less than 200"),
  notes: z.union([
    z.literal(""),
    z.string().trim().max(1000),
  ]),
});

type PetFormInput = z.input<typeof petFormSchema>;
type PetFormOutput = z.output<typeof petFormSchema>;
// type TPetForm = z.infer<typeof petFormSchema>;


export default function PetForm({actionType, onFormSubmission}: PetFormProps) {
  const { handleAddPet, handleEditPet, selectedPet } = usePetContext();

  const {
    register,
    trigger,
    formState: {
      errors
    }
  } = useForm<PetFormInput, PetFormOutput>({
    resolver: zodResolver(petFormSchema)
  });

  return (
    <form className="flex flex-col"
      action={async(formData) => {
        const isValid = await trigger();
        if (!isValid) return;

        onFormSubmission();

        const petData = {
          name: formData.get("name") as string,
          ownerName: formData.get("ownerName") as string,
          imageUrl: formData.get("imageUrl") as string ||
            "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
          age: Number(formData.get("age")),
          notes: formData.get("notes") as string,
        }

        if (actionType === "add") {
          await handleAddPet(petData);
        } else if (actionType === "edit") {
          await handleEditPet(selectedPet!.id, petData);
        }
      }
    }>
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            defaultValue={actionType === "edit" ? selectedPet?.name : ""}
            {...register("name")}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
            {...register("ownerName")}
          />
          {errors.ownerName && <p className="text-red-500 text-sm">{errors.ownerName.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
            {...register("imageUrl")}
          />
          {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            {...register("age")}
            defaultValue={actionType === "edit" ? selectedPet?.age.toString() : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
            {...register("notes")}
          />
          {errors.notes && <p className="text-red-500 text-sm">{errors.notes.message}</p>}
        </div>
      </div>
      <PetFormButton actionType={actionType} />
      
    </form>
  )
}
