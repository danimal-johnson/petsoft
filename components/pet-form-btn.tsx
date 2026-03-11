import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function PetFormButton({ actionType }: { actionType: "add" | "edit" }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="mt-5 self-end" disabled={pending}>
      {actionType === "edit" ? "Update" : "Add"}
    </Button>
  )
}
