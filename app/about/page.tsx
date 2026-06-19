'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
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
function FadeLeft({ children, delay = 0, className = '' }: AnimProps) {
  const { ref, on } = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: on ? 1 : 0,
      transform: on ? 'translateX(0)' : 'translateX(-44px)',
      transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      willChange: 'opacity, transform',
    }}>{children}</div>
  );
}
function FadeRight({ children, delay = 0, className = '' }: AnimProps) {
  const { ref, on } = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: on ? 1 : 0,
      transform: on ? 'translateX(0)' : 'translateX(44px)',
      transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      willChange: 'opacity, transform',
    }}>{children}</div>
  );
}

/* ── Icons ── */
const LeafIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);
const FlameIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);
const StarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

/* ══════════════════════════════════════════
   ABOUT CONTENT COMPONENT
══════════════════════════════════════════ */
function AboutContent() {
  return (
    <div className="min-h-screen font-sans text-slate-50 overflow-x-hidden bg-blue-950">
      
      {/* Subtle deep blue background glow */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        background: `radial-gradient(circle at 50% 0%, rgba(30, 58, 138, 0.4) 0%, transparent 80%)`
      }} />

      <Navbar/>
      

      <div className="relative z-10">
        
        {/* ── HERO SECTION (Cinematic Deep Blue) ── */}
        <section className="relative min-h-[70vh] flex items-center justify-center pt-20">
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1600" 
              alt="Grill Fire" 
              fill 
              className="object-cover opacity-20 mix-blend-overlay"
              priority
            />
            {/* Smooth blend into the blue background */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-transparent to-blue-950"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10 text-center mt-12">
            <FadeUp>
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="h-[1px] w-8 bg-red-400"></span>
                <span className="text-red-400 font-medium tracking-[0.2em] uppercase text-sm">Our Legacy</span>
                <span className="h-[1px] w-8 bg-red-400"></span>
              </div>
              <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6 font-serif">
                A Symphony of <br className="hidden md:block"/> Smoke & Spice.
              </h1>
              <p className="text-blue-200 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                Born in the heart of Dubai, crafted with the soul of the Middle East. We don't just cook food; we curate authentic culinary experiences.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── OUR ORIGINS (Offset Masonry Style) ── */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Text Side (Spans 5 columns) */}
              <div className="lg:col-span-5 lg:pr-10 order-2 lg:order-1">
                <FadeLeft className="space-y-8">
                  <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight font-serif">The Art of <br/> Uncompromised Flavor.</h2>
                  <div className="w-12 h-1 bg-red-500 rounded-full"></div>
                  <p className="text-blue-100 text-lg leading-relaxed font-light">
                    What started as an obsession with authentic charcoal grilling quickly became a landmark for connoisseurs of Pakistani and Emirati cuisine. We source our spices directly from ancient markets, grinding them by hand to ensure every dish tells a story.
                  </p>
                  <p className="text-blue-100 text-lg leading-relaxed font-light">
                    Today, across our 8 premium locations, the fire never sleeps. The marinations sit overnight, the karahis sizzle, and the legacy continues.
                  </p>
                  
                  <div className="flex gap-12 pt-6">
                    <div>
                      <h4 className="text-4xl font-serif font-light text-red-400 mb-1">15+</h4>
                      <p className="text-xs text-blue-300 font-bold uppercase tracking-widest">Years</p>
                    </div>
                    <div>
                      <h4 className="text-4xl font-serif font-light text-red-400 mb-1">8</h4>
                      <p className="text-xs text-blue-300 font-bold uppercase tracking-widest">Locations</p>
                    </div>
                  </div>
                </FadeLeft>
              </div>

              {/* Image Side (Spans 7 columns with overlapping layout) */}
              <div className="lg:col-span-7 relative h-[500px] md:h-[650px] order-1 lg:order-2 w-full">
                <FadeRight delay={100} className="absolute top-0 right-0 w-3/4 h-[75%] rounded-2xl overflow-hidden shadow-2xl border border-blue-800/50 z-10">
                  <Image src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000" alt="Restaurant interior" fill className="object-cover" />
                </FadeRight>
                <FadeUp delay={300} className="absolute bottom-0 left-0 w-2/3 h-[55%] rounded-2xl overflow-hidden shadow-2xl border border-blue-800/50 z-20">
                  <Image src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800" alt="Spices" fill className="object-cover" />
                </FadeUp>
              </div>

            </div>
          </div>
        </section>

        {/* ── OUR VALUES (Glassmorphism Navy Cards) ── */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-blue-900/10 border-y border-blue-800/30 backdrop-blur-sm"></div>
          <div className="container mx-auto px-6 md:px-12 max-w-[1200px] relative z-10">
            <FadeUp className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight font-serif mb-4">The Pillars of Tahera</h2>
              <p className="text-blue-200 text-lg font-light">Excellence is not an act, but a habit.</p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FadeUp delay={0}>
                <div className="bg-blue-900/30 backdrop-blur-md p-10 rounded-2xl border border-blue-800/50 hover:border-red-400/50 hover:bg-blue-900/50 transition-all duration-500 h-full flex flex-col items-center text-center group">
                  <div className="w-14 h-14 bg-blue-950 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    <FlameIcon />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">Live Fire Grills</h3>
                  <p className="text-blue-100 font-light text-sm leading-relaxed">No gas shortcuts. We cook exclusively over live charcoal and wood fire to impart that deep, irreplaceable smokiness.</p>
                </div>
              </FadeUp>

              <FadeUp delay={100}>
                <div className="bg-blue-900/30 backdrop-blur-md p-10 rounded-2xl border border-blue-800/50 hover:border-red-400/50 hover:bg-blue-900/50 transition-all duration-500 h-full flex flex-col items-center text-center group">
                  <div className="w-14 h-14 bg-blue-950 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    <LeafIcon />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">Pristine Sourcing</h3>
                  <p className="text-blue-100 font-light text-sm leading-relaxed">We source premium, 100% Halal cuts of meat and import specialized herbs directly from local farms in the subcontinent.</p>
                </div>
              </FadeUp>

              <FadeUp delay={200}>
                <div className="bg-blue-900/30 backdrop-blur-md p-10 rounded-2xl border border-blue-800/50 hover:border-red-400/50 hover:bg-blue-900/50 transition-all duration-500 h-full flex flex-col items-center text-center group">
                  <div className="w-14 h-14 bg-blue-950 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    <StarIcon />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">Gold Standard Service</h3>
                  <p className="text-blue-100 font-light text-sm leading-relaxed">Whether you're visiting for a quick bite or a luxury evening dinner, you will experience the famous warmth of Middle Eastern hospitality.</p>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── CALL TO ACTION ── */}
        <section className="py-32 text-center relative overflow-hidden">
          {/* Subtle flare behind text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="container mx-auto px-6 max-w-3xl relative z-10">
            <FadeUp>
              <h2 className="text-3xl md:text-5xl font-light text-white mb-6 font-serif">Experience it for yourself.</h2>
              <p className="text-blue-200 mb-12 text-lg font-light">Explore our curated menu or reserve a table at one of our stunning locations.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-5">
                <Link href="/#menu" className="bg-red-500 hover:bg-red-600 text-white font-bold px-10 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                  Explore the Menu
                </Link>
                <Link href="/#restaurants" className="bg-blue-900/50 hover:bg-blue-800 text-white border border-blue-700 font-medium px-10 py-4 rounded-full transition-all backdrop-blur-sm">
                  Find a Location
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

      </div>
    </div>
  );
}
