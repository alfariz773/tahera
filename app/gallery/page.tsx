'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';
import { CartProvider } from '../context/CartContext';
import { restaurants } from '../data/restaurants';

/* ─────────────────────────────────────────
   Scroll-reveal hook
───────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setOn(e.isIntersecting),
      { rootMargin: '-60px 0px -60px 0px', threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, on };
}

type AnimProps = { children: React.ReactNode; delay?: number; className?: string };

function FadeUp({ children, delay = 0, className = '' }: AnimProps) {
  const { ref, on } = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: on ? 1 : 0,
      transform: on ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      willChange: 'opacity, transform',
    }}>{children}</div>
  );
}

/* ── Social Icons (For Footer) ── */
const InstagramIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const FacebookIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const TwitterIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z"></path></svg>;

/* ── Expanded Gallery Data ── */
const extendedGallery = [
  'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1564671165093-20688ff1fffa?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
];

function GalleryContent() {
  return (
    <div className="min-h-screen font-sans text-slate-900 overflow-x-hidden bg-slate-50">
      
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 50% 38% at 5% 52%, rgba(30, 58, 138, 0.05) 0%, transparent 58%)`
      }} />

      <Navbar restaurants={restaurants} />
      <CartDrawer />

      <div className="relative z-10 pt-24 md:pt-32">
        
        {/* ── HERO SECTION ── */}
        <section className="container mx-auto px-6 md:px-12 max-w-[1200px] mb-12">
          <div className="bg-blue-950 rounded-[2rem] overflow-hidden relative shadow-2xl flex items-center min-h-[250px] md:min-h-[350px] px-8 md:px-16 py-12 text-center">
            <div className="absolute inset-0 z-0 opacity-20">
              <Image 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600" 
                alt="Restaurant Dining" 
                fill 
                className="object-cover mix-blend-overlay"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/80 to-transparent"></div>
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <FadeUp>
                <span className="text-red-400 font-bold tracking-widest uppercase text-sm mb-4 block">Visual Journey</span>
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
                  Our Gallery
                </h1>
                <p className="text-blue-200 text-lg font-light leading-relaxed max-w-xl mx-auto">
                  A glimpse into the Tahera experience. From our sizzling grills to our beautiful dining rooms.
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── IMAGE GRID SECTION ── */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {extendedGallery.map((src, index) => (
                <FadeUp key={index} delay={index * 50}>
                  <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden group shadow-md border border-slate-200/50 cursor-pointer">
                    <Image 
                      src={src} 
                      alt={`Tahera Gallery Image ${index + 1}`} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-blue-950/0 group-hover:bg-blue-950/20 transition-colors duration-500 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                         {/* Optional: Add a subtle plus icon or logo here on hover */}
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER (Reused) ── */}
        <footer className="bg-slate-50 border-t border-slate-200 py-8 mt-12">
          <div className="container mx-auto px-6 max-w-[1200px]">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8">
              <div className="flex items-center gap-3 shrink-0">
                <Image src="/logo.jpeg" alt="Tahera Logo" width={40} height={40} className="rounded-full shadow-sm object-contain" />
                <span className="font-bold text-base tracking-widest text-blue-950 uppercase">Tahera</span>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-10">
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-slate-600 font-medium">
                  <a href="tel:+971505972959" className="hover:text-red-600 transition-colors">+971 50 597 2959</a>
                  <span className="hidden sm:inline text-slate-300">|</span>
                  <a href="tel:+971526419506" className="hover:text-red-600 transition-colors">+971 52 641 9506</a>
                </div>
                <div className="flex items-center">
                  <a href="mailto:tahera@gmail.com" className="text-sm text-slate-600 hover:text-red-600 transition-colors font-medium">tahera@gmail.com</a>
                </div>
                <div className="flex items-center gap-5">
                  <a href="#" className="text-slate-400 hover:text-red-600 transition-transform hover:scale-110"><InstagramIcon /></a>
                  <a href="#" className="text-slate-400 hover:text-red-600 transition-transform hover:scale-110"><TwitterIcon /></a>
                  <a href="#" className="text-slate-400 hover:text-red-600 transition-transform hover:scale-110"><FacebookIcon /></a>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-200 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
              <p className="text-center md:text-left">© {new Date().getFullYear()} Tahera Restaurant. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="/privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-slate-600 transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <CartProvider>
      <GalleryContent />
    </CartProvider>
  );
}