"use client";

import { usePetContext } from "@/lib/hooks";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { addPet, editPet } from "@/actions/actions";
import { toast } from "sonner";
import PetFormButton from "./pet-form-btn";
// import { useFormState } from "react-dom";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

export default function PetForm({actionType, onFormSubmission}: PetFormProps) {
  const { selectedPet } = usePetContext();
  // useFormState(addPet, {
  //   onSuccess: () => {
  //     toast.success(`Pet ${actionType === "add" ? "added" : "edited"} successfully!`);
  //     onFormSubmission();
  //   },
  //   onError: () => {
  //     toast.error(`Failed to ${actionType === "add" ? "add" : "edit"} pet. Please try again.`);
  //   }
  // });
  // const { handleAddPet, handleEditPet, selectedPet } = useContext(PetContext)!;
  // const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
  //   e.preventDefault();
    
  //   const formData = new FormData(e.currentTarget);
  //   const petData = {
  //     name: formData.get("name") as string,
  //     ownerName: formData.get("ownerName") as string,
  //     imageUrl:
  //       (formData.get("imageUrl") as string) || 
  //       "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
  //     age: Number(formData.get("age")),
  //     notes: formData.get("notes") as string,
  //   };
  //   if (actionType === "edit" && selectedPet) {
  //     // handleEditPet(selectedPet.id, petData as Omit<Pet, "id">);
  //     console.log("Edited pet:", { ...petData, id: selectedPet.id });
  //   } else {
  //     // handleAddPet(petData as Omit<Pet, "id">);
  //     addPet(new FormData(e.currentTarget));
  //   }
  //   onFormSubmission();
  // }

  return (
    <form className="flex flex-col"
      action={async(formData) => {
        let error;
        if (actionType === "edit" && selectedPet) {
          error = await editPet(selectedPet.id, formData);
        } else {
          error = await addPet(formData);
        }
        if (error) {
          toast.warning("Failed to add pet. Please try again.");
        }
        onFormSubmission();
      }
    }>
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={actionType === "edit" ? selectedPet?.name : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            name="ownerName"
            type="text"
            required
            defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="text"
            defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="text"
            required
            defaultValue={actionType === "edit" ? selectedPet?.age.toString() : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={4}
            required
            defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
          />
        </div>
      </div>
      <PetFormButton actionType={actionType} />
      
    </form>
  )
}
