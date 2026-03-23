"use client";

import { usePetContext } from "@/lib/hooks";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import PetFormButton from "./pet-form-btn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petFormSchema, PetFormInput, PetFormOutput } from "@/lib/validations";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

export default function PetForm({actionType, onFormSubmission}: PetFormProps) {
  const { handleAddPet, handleEditPet, selectedPet } = usePetContext();

  const {
    register,
    trigger,
    getValues,
    formState: {
      errors
    }
  } = useForm<PetFormInput, PetFormOutput>({
    resolver: zodResolver(petFormSchema)
  });

  return (
    <form className="flex flex-col"
      action={async() => {
        const isValid = await trigger();
        if (!isValid) return;

        onFormSubmission();

        // const petData = {
        //   name: formData.get("name") as string,
        //   ownerName: formData.get("ownerName") as string,
        //   imageUrl: formData.get("imageUrl") as string ||
        //     DEFAULT_PET_IMAGE_URL,
        //   age: Number(formData.get("age")),
        //   notes: formData.get("notes") as string,
        // };
        const petData = petFormSchema.parse(getValues());

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
            {...register("age", { valueAsNumber: true })}
            // defaultValue={actionType === "edit" ? selectedPet?.age.toString() : ""}
            defaultValue={actionType === "edit" ? selectedPet?.age : undefined}
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
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
