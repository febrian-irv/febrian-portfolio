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

    // Attach native event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup native event listener
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
      <header className="fixed top-6 left-10 right-10 mx-10 px-10 bg-gray-300/20 shadow-lg backdrop-blur-lg border-[0.5px] border-white rounded-full z-50">
        <div className="container flex items-center justify-between text-[26px]">
          <h1>
            <Link href="/" className="font-semibold">
              febrian.
            </Link>
          </h1>

          <ul className="hidden md:flex md:flex-row space-x-8 font-lato font-light text-[22px]">
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
              {menuOpen ? <FiX size={32} /> : <FiMenu size={32} />}
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-200/40 shadow-lg py-2 z-50">
                <Link
                  href="/"
                  className="block px-4 py-2 text-lg hover:bg-gray-400 transition-colors"
                  onClick={handleLinkClick}
                >
                  home
                </Link>
                <Link
                  href="/projects"
                  className="block px-4 py-2 text-lg hover:bg-gray-400 transition-colors"
                  onClick={handleLinkClick}
                >
                  projects
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="h-28" />
    </>
  );
}
