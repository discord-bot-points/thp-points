"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Thp from '/public/images/thp.png';
import { useSession } from 'next-auth/react';
import DiscordAuthButton from './DiscordAuthButton';

const Navbar = () => {
  // État pour contrôler la visibilité du menu mobile
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession(); // Récupérer les données de session

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md relative">
      <div className="container mx-auto flex justify-between items-center p-2">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-[150px] h-[60px]">
            <Image
              src={Thp}
              alt="PointTHP Logo"
              fill
              sizes="(max-width: 640px) 80px, (max-width: 768px) 100px, 100px"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </Link>
        <div className="hidden md:flex space-x-8 items-center">
          <Link
            href="/"
            className="hover:text-gray-400 transition-colors duration-300 ml-8"
          >
            Accueil
          </Link>
          <Link
            href="/about"
            className="hover:text-gray-400 transition-colors duration-300"
          >
            À propos
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-400 transition-colors duration-300"
          >
            Contact
          </Link>
          {/* Afficher le bouton DiscordAuthButton uniquement si la session est active */}
        </div>
          {session && <DiscordAuthButton />}
        {/* Menu mobile */}
        <button className="md:hidden flex items-center" onClick={toggleMenu}>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {/* Menu mobile déroulant */}
      <div
        className={`md:hidden bg-gray-800 absolute top-14 right-0 w-full ${isOpen ? 'block' : 'hidden'}`}
        style={{ zIndex: 50 }}
      >
        <div className="p-4 space-y-4">
          <Link
            href="/"
            className="block text-white hover:text-gray-400 transition-colors duration-300"
          >
            Accueil
          </Link>
          <Link
            href="/about"
            className="block text-white hover:text-gray-400 transition-colors duration-300"
          >
            À propos
          </Link>
          <Link
            href="/contact"
            className="block text-white hover:text-gray-400 transition-colors duration-300"
          >
            Contact
          </Link>
          {/* Ajouter le bouton DiscordAuthButton dans le menu mobile */}
          {session && (
            <div className="flex justify-center mt-4">
              <DiscordAuthButton />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
