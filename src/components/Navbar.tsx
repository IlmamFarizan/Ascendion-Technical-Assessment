"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white px-4 py-3 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            className="object-contain"
            src="https://unitedpoint.com.my/wp-content/uploads/2020/01/WhatsApp-Image-2020-10-15-at-12.19.36-1080x480.jpeg"
            width={100}
            height={50}
            alt="Logo"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu className="w-full justify-center">
            <NavigationMenuList>
              {[
                "Showcase",
                "Docs",
                "Blog",
                "Analytics",
                "Templates",
                "Enterprise",
              ].map((item) => (
                <NavigationMenuItem key={item}>
                  <NavigationMenuLink asChild>
                    <Link
                      href="#"
                      className="text-sm font-medium px-3 py-2 hover:text-blue-600"
                    >
                      {item}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Desktop search bar */}
          <input
            type="text"
            placeholder="Search..."
            className="hidden md:block rounded-md border px-3 py-1 text-sm"
          />

          {/* Login button - mobile */}
          <Button
            variant="default"
            size="sm"
            className="md:hidden"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>

          {/* Login button - desktop */}
          <Button
            variant="default"
            size="sm"
            className="hidden md:inline-flex"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>

          {/* Mobile search toggle */}
          <button
            className="md:hidden text-gray-700"
            aria-label="Toggle search"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-6 w-6" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Field */}
      {isSearchOpen && (
        <div className="md:hidden mt-2 px-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col items-start gap-3 px-4">
          {[
            "Showcase",
            "Docs",
            "Blog",
            "Analytics",
            "Templates",
            "Enterprise",
          ].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-sm font-medium text-gray-800"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
