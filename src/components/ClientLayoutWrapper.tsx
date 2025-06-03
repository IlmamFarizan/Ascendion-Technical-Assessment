"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showNavbar = !pathname.startsWith("/dashboard");

  return (
    <body className="antialiased">
      {showNavbar && <Navbar />}
      {children}
    </body>
  );
}
