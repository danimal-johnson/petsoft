// import { PlusIcon } from "lucide-react";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

type PetButtonProps = {
  actionType?: "add" | "edit" | "checkout";
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function PetButton({ actionType, onClick, children }: PetButtonProps) {
  if (actionType === "add") return (
  <Button variant="default" size="icon-lg">
    {/* Make the icon larger to match the design */}
    <PlusIcon className="h-6 w-6" />
  </Button>
  );
  if (actionType === "edit") return <Button variant="secondary" size="sm">{children}</Button>;
  if (actionType === "checkout") return <Button variant="secondary" onClick={onClick} size="sm">{children}</Button>;
}
