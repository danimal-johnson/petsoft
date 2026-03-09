"use client";

import { useContext } from "react";
import { PetContext } from "@/contexts/pet-context-provider";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Pet } from "@/lib/types";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

export default function PetForm({actionType, onFormSubmission}: PetFormProps) {
  const { handleAddPet } = useContext(PetContext)!;
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const petData = {
      name: formData.get("name") as string,
      ownerName: formData.get("ownerName") as string,
      imgUrl:
        (formData.get("imgUrl") as string) || 
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      age: Number(formData.get("age")),
      notes: formData.get("notes") as string,
    };
    handleAddPet(petData as Omit<Pet, "id">);
    onFormSubmission();
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name"type="text" required></Input>
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" name="ownerName" type="text" required></Input>
        </div>
        <div className="space-y-1">
          <Label htmlFor="imgUrl">Image URL</Label>
          <Input id="imgUrl" name="imgUrl" type="text"></Input>
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" name="age" type="text" required></Input>
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" name="notes" rows={4} required></Textarea>
        </div>
      </div>
      <Button type="submit" className="mt-5 self-end">
        {actionType === "edit" ? "Update" : "Add"}
      </Button>
    </form>
  )
}
