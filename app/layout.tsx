import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PetSoft - Pet daycare software",
  description: "Take care of people's pets responsibly with PetSoft.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased text-sm text-zinc-900 dark:text-gray-100 bg-[#E5E8EC] dark:bg-zinc-900 min-h-screen`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

// ${geistSans.variable} ${geistMono.variable} antialiased