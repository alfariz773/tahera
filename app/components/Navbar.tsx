'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  { id: 'about',   label: 'About Us' },
  { id: 'contact', label: 'Contact Us' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Get the current route path
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getNavLink = (id: string) => {
    if (id === 'home') return '/';
    if (id === 'menu') return '/menu';
    if (id === 'about') return '/about';
    if (id === 'contact') return '/contact';
    if (id === 'gallery') return '/gallery';
    return `/#${id}`;
  };

  return (
    <header
      className={`fixed left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1400px] z-50 transition-all duration-500 ${
        isScrolled ? 'top-2' : 'top-4'
      }`}
    >
      {/* THE GRADIENT WRAPPER */}
      <div className={`w-full rounded-full bg-gradient-to-r from-white via-blue-500 to-orange-500 p-[2px] transition-shadow duration-300 ${
        isScrolled ? 'shadow-[0_8px_30px_rgba(59,130,246,0.2)]' : 'shadow-xl'
      }`}>
        
        {/* THE INNER NAVBAR */}
        <div className="w-full bg-blue-950/95 backdrop-blur-xl rounded-full px-5 md:px-8 py-3 flex items-center justify-between relative overflow-hidden">
          
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-blue-500/5 to-orange-500/10 pointer-events-none rounded-full" />

          {/* Logo */}
          <Link href="/" className="flex flex-col items-center shrink-0 group relative z-10">
            <div className="bg-white rounded-full p-0.5 transition-transform duration-300 group-hover:scale-105">
             <Image
  src="/logo.jpeg"
  alt="Tahera"
  width={38}
  height={38}
  className="rounded-full object-contain w-auto h-auto"
  priority
/>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center space-x-2 text-sm font-bold uppercase tracking-wider relative z-10 ml-auto">
            {NAV_LINKS.map(({ id, label }) => {
              const href = getNavLink(id);
              const isActive = pathname === href;

              return (
                <Link
                  key={id}
                  href={href}
                  className={`transition-colors px-4 py-2 rounded-full hover:text-orange-400 ${
                    isActive ? 'text-orange-400 bg-white/5' : 'text-white'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2 rounded-full hover:bg-white/10 hover:text-orange-400 active:scale-95 transition-all relative z-10"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-[calc(100%+1rem)] left-0 w-full bg-blue-950/95 backdrop-blur-xl shadow-2xl py-6 px-4 rounded-2xl border border-blue-800 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-row flex-wrap justify-center items-center gap-x-2 gap-y-4">
            {NAV_LINKS.map(({ id, label }) => {
              const href = getNavLink(id);
              const isActive = pathname === href;

              return (
                <Link
                  key={id}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-[12px] font-bold uppercase tracking-widest transition-colors px-4 py-2 rounded-full text-center hover:bg-white/10 hover:text-orange-400 ${
                    isActive ? 'text-orange-400 bg-white/10' : 'text-white'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}