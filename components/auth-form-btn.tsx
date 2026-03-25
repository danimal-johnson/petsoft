"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type AuthFormBtnProps = {
  method: "login" | "signup";
};

export default function AuthFormBtn({ method }: AuthFormBtnProps) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending}>
      {method === "login" ? "Log In" : "Sign Up"}
    </Button>
  );
}
