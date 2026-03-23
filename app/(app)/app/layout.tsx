import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";
import BackgroundPattern from "@/components/background-pattern";
import PetContextProvider from "@/contexts/pet-context-provider";
import { Pet } from "@/lib/types";
import SearchContextProvider from "@/contexts/search-context-provider";
import prisma from "@/lib/db";
import { Toaster } from "@/components/ui/sonner";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Get the pets
  const pets: Pet[] = await prisma.pet.findMany();
  const user = await prisma.user.findUnique({
    where: {
      email: "user@example.com", // Put include: pets line here?
    },
    include: { pets: true },
  });

  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col min-h-screen max-w-[1050px] mx-auto px-4">
        <AppHeader />

        <PetContextProvider data={pets}>
          <SearchContextProvider>
            {children}
          </SearchContextProvider>
        </PetContextProvider>

        <AppFooter />
      </div>

      <Toaster position="top-right" richColors />
    </>
  )
}