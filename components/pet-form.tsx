import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";


export default function PetForm({actionType}: { actionType?: "add" | "edit" }) {
  return (
    <form className="flex flex-col">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text"></Input>
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" type="text"></Input>
        </div>
        <div className="space-y-1">
          <Label htmlFor="imgUrl">Image URL</Label>
          <Input id="imgUrl" type="text"></Input>
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="text"></Input>
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" rows={4}></Textarea>
        </div>
      </div>
      <Button type="submit" className="mt-5 self-end">
        {actionType === "edit" ? "Update" : "Add"}
      </Button>
    </form>
  )
}
