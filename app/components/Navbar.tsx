'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const HamburgerIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const NAV_LINKS = [
  { id: 'home',    label: 'Home' },
  { id: 'menu',    label: 'Menu' },
  { id: 'gallery', label: 'Gallery' },
  // { id: 'offers',  label: 'Offers' },
  { id: 'about',   label: 'About Us' },
  { id: 'contact', label: 'Contact Us' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab,  setActiveTab]  = useState('home');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-12 flex items-center justify-between max-w-[1400px]">

        {/* Logo */}
        <a
          href="#home"
          onClick={() => setActiveTab('home')}
          className="flex flex-col items-center gap-0.5 shrink-0"
        >
          <Image
            src="/logo.jpeg"
            alt="Tahera"
            width={38}
            height={38}
            className="rounded-full shadow-sm object-contain"
            priority
          />
          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-900 hidden sm:block leading-none">
            Tahera
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold uppercase tracking-wider text-gray-600 ml-auto">
          {NAV_LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setActiveTab(id)}
              className={`transition-colors py-1 ${
                activeTab === id
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'hover:text-red-500'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-gray-800 p-2"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-xl py-6 px-6 flex flex-row flex-wrap justify-center gap-x-6 gap-y-4 border-t border-red-100">
          {NAV_LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => {
                setActiveTab(id);
                setMobileOpen(false);
              }}
              className={`text-[11px] font-bold uppercase tracking-widest transition-colors px-2 py-1 rounded-full ${
                activeTab === id
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-700 hover:text-red-500'
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}