"use client";

import { useState, useEffect } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import Link from "next/link"; 
import { Button } from "../ui/button";

interface NavLink {
  name: string;
  href: string;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks:NavLink[] = [
    { name: "Funcionalidades", href: "#features" },
    { name: "Depoimentos", href: "#testimonials" },
    { name: "Planos", href: "#pricings" },
  ];

  return (
    <header className="w-full flex justify-center fixed top-5 z-50 bg-transparent">
      <nav
        className={`
          bg-white rounded-full shadow-lg flex items-center justify-between
          max-w-5xl transition-all duration-300
          px-6 min-[820px]:px-6 lg:px-10
          ${
            scrolled
              ? "w-11/12 min-[820px]:w-[65%] py-4"
              : "w-11/12 min-[820px]:w-[70%] py-4"
          }
        `}
      >

        <Link 
          href="#home" 
          className="text-lg font-bold text-black shrink-0 whitespace-nowrap"
        >
          AgiliChat
        </Link>

        <div className="hidden min-[820px]:flex items-center min-[820px]:gap-4 lg:gap-8 text-black font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-[#8093F1] transition whitespace-nowrap min-[820px]:text-sm lg:text-base"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden min-[820px]:flex items-center shrink-0">
          <Button
            asChild
            className="bg-[#8093F1] text-white rounded-full font-medium hover:bg-[#5C66C0] transition whitespace-nowrap
            min-[820px]:text-sm lg:text-base min-[820px]:px-4 min-[820px]:py-2 lg:px-4 lg:py-2"
          >
            <Link href="/login">Começar Agora</Link>
          </Button>
        </div>

        <div className="min-[820px]:hidden flex items-center">
          <button
            onClick={(): void => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? (
              <HiOutlineX size={28} className="text-[#4A4E69]" />
            ) : (
              <HiOutlineMenuAlt3 size={28} className="text-[#4A4E69]" />
            )}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`
          min-[820px]:hidden fixed top-24 left-1/2 transform -translate-x-1/2 
          bg-white rounded-lg shadow-lg w-11/12 max-w-sm p-6 
          flex flex-col gap-4 z-40
          transition-all duration-300 ease-in-out
          ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-[#4A4E69] font-medium hover:text-[#8093F1] active:text-[#8093F1] transition"
            onClick={(): void => setMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
        <Button
          asChild
          className="bg-[#8093F1] text-white px-6 py-2 rounded-full font-medium hover:bg-[#5C66C0] active:bg-[#5C66C0] transition text-center"
        >
          <Link href="/login" onClick={(): void => setMenuOpen(false)}>
            Começar Agora
          </Link>
        </Button>
      </div>
    </header>
  );
}