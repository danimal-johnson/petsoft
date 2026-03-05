import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={logo}
        alt="PetSoft logo"
      />
    </Link>
  );
}
