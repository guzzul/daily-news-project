"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Triangle, Hamburger } from "lucide-react"; // Or your own icon component
import { Label } from "./ui/label";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// Define navigation links for consistency
const navLinks = [
  { href: "/", title: "Home" },
  { href: "/search", title: "Search" },
];

export function Header() {
  return (
    // Header container with padding and border for structure
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <NavigationMenu className="w-full max-w-none justify-start">
          <NavigationMenuList className="flex-1 space-x-0 w-full justify-between gap-1 md:justify-start">
            {/* Logo and Partner Text Section - Left-aligned */}
            <NavigationMenuItem className="flex items-center gap-2 pr-4 text-nowrap">
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  "h-auto p-0 hover:bg-transparent",
                )}
              >
                <Link href="/">
                  {/* Using an icon from lucide-react to represent the black triangle */}
                  <div className="flex aspect-square h-8 items-center justify-center rounded-lg bg-black text-white p-1.5">
                    <Triangle className="dark:invert size-full fill-white" />
                  </div>
                  <Label className="sr-only">Vercel Logo</Label>
                </Link>
              </NavigationMenuLink>
              <span className="font-semibold text-sm">
                Guzzul Daily
              </span>
            </NavigationMenuItem>

            {/* Desktop Navigation - Hidden on mobile, shown on md+ */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.title}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "text-sm text-foreground/70",
                    )}
                  >
                    <Link href={link.href}>{link.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </div>

            {/* Mobile "Menu" Trigger - Only visible on small screens.
              For a full mobile menu, you would use a 'Dialog' (Modal) or 'Sheet' component
              from shadcn/ui. For simplicity here, we'll use NavigationMenu's trigger.
            */}
            <NavigationMenuItem className="md:hidden">
              <NavigationMenuTrigger className="text-sm font-medium">
                <Hamburger className="ml-2" />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-3 p-4">
                  {navLinks.map((link) => (
                    <li key={link.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={link.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {link.title}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
