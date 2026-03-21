import { Button } from "./ui/button";

type PetFormButtonProps = {
  actionType: "add" | "edit";
};

export default function PetFormButton({ actionType }: PetFormButtonProps) {
  return (
    <Button type="submit" className="mt-5 self-end">
      {actionType === "edit" ? "Update" : "Add"}
    </Button>
  )
}
