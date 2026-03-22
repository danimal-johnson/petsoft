"use client";

import { usePetContext } from "@/lib/hooks";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import PetFormButton from "./pet-form-btn";
import { useForm } from "react-hook-form";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

type TPetForm = {
  name: string;
  ownerName: string;
  imageUrl: string;
  age: number;
  notes: string;
}

export default function PetForm({actionType, onFormSubmission}: PetFormProps) {
  const { handleAddPet, handleEditPet, selectedPet } = usePetContext();

  const {
    register,
    trigger,
    formState: {
      errors
    }
  } = useForm<TPetForm>();

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
            {...register("name", { 
              required: "Name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters" },
            })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
            {...register("ownerName", { required: "Owner Name is required" })}
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
            {...register("age", { required: "Age is required" })}
            defaultValue={actionType === "edit" ? selectedPet?.age.toString() : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
            {...register("notes", { required: "Notes are required" })}
          />
          {errors.notes && <p className="text-red-500 text-sm">{errors.notes.message}</p>}
        </div>
      </div>
      <PetFormButton actionType={actionType} />
      
    </form>
  )
}
