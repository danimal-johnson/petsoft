"use client";

import { logOut } from "@/actions/actions";
import { Button } from "./ui/button";

export default function SignOutButton() {
  return (
    <Button onClick={async() => await logOut()} className="mt-5 self-end">
      Sign out
    </Button>
  )
}
