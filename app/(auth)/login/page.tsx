import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";

export default function Login() {
  return (
    <main className ="flex flex-col gap-y-5 justify-center items-center">
      <H1>Log In</H1>
      <AuthForm method="login"/>
      <p>No account yet?{" "}
        <Link href="/signup" className="mt-6 font-medium text-zinc-500">Sign up</Link>
      </p>
    </main>
  );
}
