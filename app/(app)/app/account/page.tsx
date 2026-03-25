import { redirect } from "next/navigation";
import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import SignOutButton from "@/components/sign-out-btn";
import { auth } from "@/lib/auth";

export default async function Account() {
  const session = await auth();
  if (!session?.user) redirect("/");
  return (
    <main>

      <H1 className="my-8 text-white">Your Account</H1>

      <ContentBlock className="p-4 h-[500px] flex flex-col items-center justify-center">
        <p>You are currently logged in as {session.user.email}</p>
        <p><SignOutButton /></p>
      </ContentBlock>
    </main>
  )
}
