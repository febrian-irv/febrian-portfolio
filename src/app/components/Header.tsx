"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-4 left-4 right-4 mx-4 px-6 bg-gray-300/20 shadow-lg backdrop-blur-lg border-[0.5px] border-white rounded-full z-50">
        <div className="flex items-center justify-between text-[20px]">
          <h1>
            <Link href="/" className="font-semibold">
              febrian.
            </Link>
          </h1>

          <ul className="hidden md:flex md:flex-row space-x-6 font-lato font-light text-[18px]">
            <li>
              <Link href="/" className="hover:underline">
                home
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:underline">
                projects
              </Link>
            </li>
          </ul>

          <div className="relative md:hidden" ref={dropdownRef}>
            <button
              className="p-2 hover:bg-gray-200/20 rounded-full transition-colors"
              onClick={handleMenuClick}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-[90vw] max-w-sm rounded-lg bg-gray-200/90 shadow-lg py-2 z-50">
                <Link
                  href="/"
                  className="block px-4 py-3 text-base hover:bg-gray-400/40 transition-colors"
                  onClick={handleLinkClick}
                >
                  home
                </Link>
                <Link
                  href="/projects"
                  className="block px-4 py-3 text-base hover:bg-gray-400/40 transition-colors"
                  onClick={handleLinkClick}
                >
                  projects
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="h-24 md:h-28" />
    </>
  );
}
