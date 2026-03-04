import Image from "next/image";
import Logo from "../components/logo";

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="Petsoft Preview"
        width={519}
        height={472}
      />
      <div>
        <Logo />
        <h1 className="text-5xl font-semibold my-6 max-w-125">
          Manage your <span className="font-extrabold">pet daycare</span> with ease.
        </h1>
        <p className="text-2xl font-medium max-w-150">Use PetSoft to easily keep track of pets under your care. Get lifetime access for $299
        </p>
        <div className="mt-10 flex flex-row items-center gap-4">
          <button className="border-2 border-zinc-900 dark:border-gray-100 rounded-lg p-4">Get started</button>
          <button className="border-2 border-zinc-900 dark:border-gray-100 rounded-lg p-4">Log in</button>
        </div>
      </div>
    </main>
  );
}
