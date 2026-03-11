"use client";

// import { PlusIcon } from "lucide-react";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog";
import PetForm from "./pet-form";
import { useState } from "react";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function PetButton({ actionType, disabled, onClick, children }: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (actionType === "checkout") return (
    <Button variant="secondary" onClick={onClick} size="sm" disabled={disabled}>
      {children}
    </Button>
  );

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen} >
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button variant="default" size="icon-lg">
            {/* Make the icon larger to match the design */}
            <PlusIcon className="h-6 w-6" />
          </Button>
        ) : (
          <Button variant="secondary" size="sm">{children}</Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            { actionType === "add" ? "Add New Pet" : "Edit Pet" }
          </DialogTitle>
        </DialogHeader>
          <PetForm
            actionType={actionType}
            onFormSubmission={() => setIsFormOpen(false)}
          />
      </DialogContent>
    </Dialog>
  );
}
