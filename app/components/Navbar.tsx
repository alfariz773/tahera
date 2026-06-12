'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Restaurant } from '../data/restaurants';

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
  { id: 'home',     label: 'Home' },
  { id: 'menu',     label: 'Menu' },
  { id: 'gallery',  label: 'Gallery' },
  { id: 'about',    label: 'About Us' },
  { id: 'contact',  label: 'Contact Us' },
];

type NavbarProps = {
  restaurants: Restaurant[];
  onSelectMenu: (id: string) => void;
};

export default function Navbar({ restaurants, onSelectMenu }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab,  setActiveTab]  = useState('home');
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuSelect = (restaurantId: string) => {
    onSelectMenu(restaurantId);
    setActiveTab('menu');
    setMenuDropdownOpen(false);
    setMobileOpen(false);
    setMobileMenuExpanded(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-12 flex items-center justify-between max-w-[1400px]">

        {/* Logo */}
        <a
          href="#home"
          onClick={() => setActiveTab('home')}
          className="flex flex-col items-center gap-0.5 shrink-0 group"
        >
          <Image
            src="/logo.jpeg"
            alt="Tahera"
            width={38}
            height={38}
            className="rounded-full shadow-sm object-contain"
            priority
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold uppercase tracking-wider text-slate-600 ml-auto">
          {NAV_LINKS.map(({ id, label }) => {
            if (id === 'menu') {
              return (
                <div 
                  key={id} 
                  className="relative group py-4"
                  onMouseEnter={() => setMenuDropdownOpen(true)}
                  onMouseLeave={() => setMenuDropdownOpen(false)}
                >
                  <a
                    href={`#${id}`}
                    onClick={() => setActiveTab(id)}
                    className={`transition-colors py-1 flex items-center gap-1 ${
                      activeTab === id ? 'text-blue-950 border-b-2 border-blue-950' : 'hover:text-blue-900'
                    }`}
                  >
                    {label}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${menuDropdownOpen ? 'rotate-180' : ''}`}>
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </a>
                  
                  {/* Desktop Dropdown Box */}
                  <div className={`absolute top-full left-0 w-64 bg-white/95 backdrop-blur-md shadow-xl border border-slate-100 rounded-xl overflow-hidden transition-all duration-200 ${menuDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                    {restaurants.map(r => (
                      <button
                        key={r.id}
                        onClick={() => handleMenuSelect(r.id)}
                        className="w-full text-left px-5 py-3 text-xs font-bold text-slate-600 hover:text-blue-950 hover:bg-blue-50 border-b border-slate-50 last:border-none transition-colors flex justify-between items-center"
                      >
                        {r.name}
                        {r.openingSoon && <span className="text-[9px] text-red-500 uppercase tracking-widest">Soon</span>}
                      </button>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setActiveTab(id)}
                className={`transition-colors py-1 ${
                  activeTab === id ? 'text-blue-950 border-b-2 border-blue-950' : 'hover:text-blue-900'
                }`}
              >
                {label}
              </a>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-blue-950 p-2 rounded-full hover:bg-blue-50 active:scale-95 transition-all"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-xl py-5 px-4 border-t border-slate-100 max-h-[85vh] overflow-y-auto">
          
          {/* Main Links - Displayed in a Row */}
          <div className="flex flex-row flex-wrap justify-center items-center gap-x-4 gap-y-3">
            {NAV_LINKS.map(({ id, label }) => {
              if (id === 'menu') {
                return (
                  <button
                    key={id}
                    onClick={() => setMobileMenuExpanded(!mobileMenuExpanded)}
                    className={`text-[12px] font-bold uppercase tracking-widest transition-colors px-3 py-1.5 flex items-center gap-1 rounded-full ${
                      activeTab === id ? 'bg-blue-50 text-blue-950' : 'text-slate-500 hover:text-red-600'
                    }`}
                  >
                    {label}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${mobileMenuExpanded ? 'rotate-180' : ''}`}>
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </button>
                );
              }

              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => {
                    setActiveTab(id);
                    setMobileOpen(false);
                    setMobileMenuExpanded(false);
                  }}
                  className={`text-[12px] font-bold uppercase tracking-widest transition-colors px-3 py-1.5 rounded-full text-center ${
                    activeTab === id ? 'bg-blue-50 text-blue-950' : 'text-slate-500 hover:text-red-600'
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </div>

          {/* Expanded Restaurant List - Appears Below the Row */}
          {mobileMenuExpanded && (
            <div className="w-full flex flex-col mt-5 bg-slate-50/80 rounded-xl border border-slate-200/60 overflow-hidden shadow-inner">
              {restaurants.map((r, index) => (
                <button
                  key={r.id}
                  onClick={() => handleMenuSelect(r.id)}
                  className={`w-full text-left px-4 py-3.5 text-[13px] font-semibold text-slate-600 active:bg-slate-200 transition-colors flex justify-between items-center ${
                    index !== restaurants.length - 1 ? 'border-b border-slate-200/60' : ''
                  }`}
                >
                  <span className="truncate pr-3">{r.name}</span>
                  {r.openingSoon && (
                    <span className="text-[10px] text-white bg-red-500 px-2 py-0.5 rounded-full uppercase tracking-widest shrink-0 font-bold">
                      Soon
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

        </div>
      )}
    </header>
  );
}