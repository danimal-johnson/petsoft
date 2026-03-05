"use client";

import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  { label: "Dashboard", path: "/app/dashboard" },
  { label: "Account", path: "/app/account" },
  { label: "Contact", path: "/contact" },
];

export default function AppHeader() {
  const activePathname = usePathname();
  console.log("activePathname", activePathname);
  

  return (
    <header className="flex justify-between items-center border-b border-white/10 py-2">
      <Logo />
      <nav>
        <ul className="flex flex-row gap-2 text-xs">
          {routes.map((route) => (
            <li key={route.path}>
              <Link href={route.path}
                className={cn(`text-white/70 rounded-sm px-2 py-1 hover:text-white focus:text-white transition`, {
                  "bg-black/10": activePathname === route.path,
                })}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
