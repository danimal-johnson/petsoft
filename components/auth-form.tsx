"use client";

import { logIn, signUp } from "@/actions/actions";
import AuthFormBtn from "./auth-form-btn";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type AuthFormProps = {
  method: "login" | "signup";
}

// For login form action, consider:
// <form action={() => { 
//   await logIn;
//   router.push("dashboard");
// }}>

export default function AuthForm({ method }: AuthFormProps) {
  
  return (
        <form className="flex flex-col space-y-2" 
          action={method === "login" ? logIn : signUp}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              // className="w-80 px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              // className="w-80 px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <AuthFormBtn method={method} />
        </form>
  )
}
