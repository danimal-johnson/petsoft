import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";

export default function Signup() {
  return (
    <main className ="flex flex-col gap-y-5 justify-center items-center">
      <H1>Sign Up</H1>
      <AuthForm method="signup" />
      <p>Already have an account?{" "}
        <Link href="/login" className="mt-6 font-medium text-zinc-500">Log in</Link>
      </p>
    </main>
  );
}
