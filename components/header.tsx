"use client";

import Link from "next/link";
import { useState } from "react";
import { Triangle, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", title: "Home" },
  { href: "/search", title: "Search" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto px-4 flex h-16 items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg 
              bg-black text-white dark:bg-white dark:text-black 
              p-1.5 shrink-0"
            >
              <Triangle className="size-full fill-current" />
            </div>

            <span className="font-semibold text-sm whitespace-nowrap relative top-[1px]">
              Guzzul Daily
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-2 ml-6">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className={cn(
                "text-sm text-foreground/70 px-3 py-2 rounded-md",
                "hover:bg-accent hover:text-accent-foreground transition",
              )}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="ml-auto md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md hover:bg-accent transition"
            aria-label="Toggle Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-md text-sm hover:bg-accent transition"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}