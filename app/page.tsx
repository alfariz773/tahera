'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import { useCart, CartProvider } from './context/CartContext'; 
import { restaurants } from './data/restaurants';
import type { Restaurant } from './data/restaurants';

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
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
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
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
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
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      willChange: 'opacity, transform',
    }}>{children}</div>
  );
}
function FadeDown({ children, delay = 0, className = '' }: AnimProps) {
  const { ref, on } = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: on ? 1 : 0,
      transform: on ? 'translateY(0)' : 'translateY(-32px)',
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      willChange: 'opacity, transform',
    }}>{children}</div>
  );
}

const menuItems = [
  { name: 'Authentic Chicken Biryani', desc: 'Fragrant basmati rice cooked with tender chicken and exotic spices.', price: 'AED 45', img: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=800' },
  { name: 'Peshawari Mutton Karahi',   desc: 'Slow-cooked mutton in a rich tomato base.',                           price: 'AED 65', img: 'https://images.unsplash.com/photo-1601728902047-9f6674971c26?auto=format&fit=crop&q=80&w=800' },
  { name: 'Arabic Mixed Grill',        desc: 'A premium selection of shish tawook and lamb chops.',                 price: 'AED 85', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800' },
];

const galleryImages = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1564671165093-20688ff1fffa?auto=format&fit=crop&q=80&w=600',
];

/* ══════════════════════════════════════════
   HOME CONTENT COMPONENT
══════════════════════════════════════════ */
function HomeContent() {
  const [activeMenuId, setActiveMenuId] = useState<string>(restaurants[0].id);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const { addToCart } = useCart(); 
  const activeRestaurantMenu = restaurants.find(r => r.id === activeMenuId) || restaurants[0];

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* ── Hero cursor-reactive tilt + glow tracking ── */
  const heroRef = useRef<HTMLDivElement>(null);
  const dishWrapRef = useRef<HTMLDivElement>(null);
  const [heroHover, setHeroHover] = useState(false);

  const handleHeroPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const heroEl = heroRef.current;
    if (!heroEl) return;
    const heroRect = heroEl.getBoundingClientRect();

    const px = ((e.clientX - heroRect.left) / heroRect.width) * 100;
    const py = ((e.clientY - heroRect.top) / heroRect.height) * 100;
    heroEl.style.setProperty('--cx', `${px}%`);
    heroEl.style.setProperty('--cy', `${py}%`);

    const dishEl = dishWrapRef.current;
    if (dishEl) {
      const dishRect = dishEl.getBoundingClientRect();
      const dx = (e.clientX - (dishRect.left + dishRect.width / 2)) / (dishRect.width / 2);
      const dy = (e.clientY - (dishRect.top + dishRect.height / 2)) / (dishRect.height / 2);
      const clampedX = Math.max(-1, Math.min(1, dx));
      const clampedY = Math.max(-1, Math.min(1, dy));
      dishEl.style.setProperty('--tiltX', `${(-clampedY * 14).toFixed(2)}deg`);
      dishEl.style.setProperty('--tiltY', `${(clampedX * 14).toFixed(2)}deg`);
    }
  };

  const handleHeroPointerLeave = () => {
    setHeroHover(false);
    const dishEl = dishWrapRef.current;
    if (dishEl) {
      dishEl.style.setProperty('--tiltX', '0deg');
      dishEl.style.setProperty('--tiltY', '0deg');
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 overflow-x-hidden" style={{ background: '#fff' }}>

      <style>{`
        html { scroll-behavior: smooth; }
        .bg-fixed-layer {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 55% 45% at  2% 10%,  rgba(30, 58, 138, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 45% 35% at 98% 22%,  rgba(249, 115, 22, 0.12) 0%, transparent 55%),
            radial-gradient(ellipse 50% 38% at  5% 52%,  rgba(30, 58, 138, 0.08) 0%, transparent 58%),
            radial-gradient(ellipse 48% 32% at 96% 62%,  rgba(239, 68, 68, 0.08) 0%, transparent 52%),
            radial-gradient(ellipse 52% 36% at  8% 88%,  rgba(249, 115, 22, 0.12) 0%, transparent 56%),
            radial-gradient(ellipse 44% 30% at 92% 95%,  rgba(30, 58, 138, 0.10) 0%, transparent 50%);
        }
        .page-content { position: relative; z-index: 1; }

        /* ── Hero dish float (slightly more organic — tiny rotation + lift) ── */
        @keyframes float {
          0%   { transform: translateY(0) rotate(0deg); }
          50%  { transform: translateY(-16px) rotate(1.2deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .float-anim { animation: float 6s ease-in-out infinite; }

        /* ── Contact shadow beneath the plate, breathing opposite the float ── */
        @keyframes hero-shadow-pulse {
          0%, 100% { transform: translateX(-50%) scaleX(1);    opacity: 0.32; }
          50%      { transform: translateX(-50%) scaleX(0.82); opacity: 0.18; }
        }
        .hero-shadow { animation: hero-shadow-pulse 6s ease-in-out infinite; }

        /* ── Soft ambient glow blobs behind the dish ── */
        @keyframes glow-pulse-a {
          0%, 100% { transform: scale(1) translate(0,0);     opacity: 0.55; }
          50%      { transform: scale(1.12) translate(10px,-6px); opacity: 0.8; }
        }
        @keyframes glow-pulse-b {
          0%, 100% { transform: scale(1) translate(0,0);      opacity: 0.45; }
          50%      { transform: scale(1.15) translate(-12px,8px); opacity: 0.7; }
        }
        .hero-glow-a { animation: glow-pulse-a 7s ease-in-out infinite; }
        .hero-glow-b { animation: glow-pulse-b 8s ease-in-out infinite; }

        /* ── Orbiting rings around the dish ── */
        @keyframes spin-slow   { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-rev    { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        .hero-ring-1 { animation: spin-slow 22s linear infinite; }
        .hero-ring-2 { animation: spin-rev 30s linear infinite; }

        /* ── Small dots orbiting at different radii, carried by the ring rotation ── */
        .hero-orbit-dot { filter: drop-shadow(0 2px 6px rgba(0,0,0,0.15)); }

        /* ── Sparkle twinkle accents scattered in the empty space ── */
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50%      { opacity: 0.9;  transform: scale(1.15); }
        }
        .hero-sparkle { animation: twinkle 3.2s ease-in-out infinite; }

        /* ══════════════════════════════════════════
           PREMIUM HOVER — used on the hero dish
           Light traces the object's own silhouette;
           no background blobs, no flat shadow ellipse.
        ══════════════════════════════════════════ */
        .hero-section {
          --cx: 50%;
          --cy: 50%;
        }

        /* Dish 3D tilt toward cursor — kept subtle, this is the "premium" core motion */
        .hero-dish-tilt {
          --tiltX: 0deg;
          --tiltY: 0deg;
          transform: perspective(1000px) rotateX(var(--tiltX)) rotateY(var(--tiltY));
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
        }
        .hero-section.is-hovering .hero-dish-tilt {
          transition: transform 0.15s ease-out;
        }
        .hero-dish-scale {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
          transform: scale(1);
        }
        .hero-section.is-hovering .hero-dish-scale {
          transform: scale(1.03);
        }
        .hero-section.is-hovering .hero-dish-scale .float-anim {
          filter: drop-shadow(0 24px 30px rgba(30,58,138,0.22)) drop-shadow(0 0 36px rgba(249,115,22,0.18));
        }

        /* Rim-light: a slim glowing arc that traces along the plate's own edge, only on hover */
        .hero-rim-light {
          position: absolute;
          inset: 6%;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.45s ease;
          background: conic-gradient(from var(--rim-angle, 0deg), transparent 0deg, rgba(249,115,22,0.55) 18deg, transparent 50deg, transparent 310deg, rgba(30,58,138,0.45) 342deg, transparent 360deg);
          -webkit-mask: radial-gradient(circle, transparent 62%, black 64%, black 68%, transparent 70%);
          mask: radial-gradient(circle, transparent 62%, black 64%, black 68%, transparent 70%);
          filter: blur(1px);
        }
        .hero-section.is-hovering .hero-rim-light {
          opacity: 1;
          animation: rim-rotate 4s linear infinite;
        }
        @keyframes rim-rotate {
          from { --rim-angle: 0deg; }
          to   { --rim-angle: 360deg; }
        }

        /* Light particles: tiny embers drifting upward past the dish on hover, premium-feeling */
        .hero-ember {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          background: radial-gradient(circle, rgba(249,115,22,0.9), rgba(249,115,22,0));
        }
        .hero-section.is-hovering .hero-ember {
          animation: ember-rise 2.6s ease-in infinite;
        }
        @keyframes ember-rise {
          0%   { opacity: 0; transform: translateY(0) scale(0.6); }
          15%  { opacity: 0.9; }
          80%  { opacity: 0.35; }
          100% { opacity: 0; transform: translateY(-90px) scale(1); }
        }

        /* Faint single-pass sheen sweeping across the dish once per hover-enter */
        .hero-sheen {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          pointer-events: none;
          overflow: hidden;
        }
        .hero-sheen::after {
          content: '';
          position: absolute;
          top: -20%;
          left: -60%;
          width: 40%;
          height: 140%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: translateX(0) rotate(8deg);
          opacity: 0;
        }
        .hero-section.is-hovering .hero-sheen::after {
          animation: sheen-sweep 1.1s ease-out;
        }
        @keyframes sheen-sweep {
          0%   { transform: translateX(-40%) rotate(8deg); opacity: 0; }
          15%  { opacity: 0.9; }
          100% { transform: translateX(340%) rotate(8deg); opacity: 0; }
        }

        /* ── Hero text choreography ── */
        .hero-line {
          display: block;
          overflow: hidden;
        }
        .hero-line span {
          display: inline-block;
          transform: translateY(110%);
          opacity: 0;
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.7s ease;
        }
        .hero-loaded .hero-line span { transform: translateY(0); opacity: 1; }

        .hero-eyebrow {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .hero-loaded .hero-eyebrow { opacity: 1; transform: translateY(0); }

        .hero-eyebrow-rule {
          display: inline-block;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #f97316, #ef4444);
          margin-right: 10px;
          vertical-align: middle;
          border-radius: 2px;
          transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.15s;
        }
        .hero-loaded .hero-eyebrow-rule { width: 28px; }

        .hero-para {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .hero-loaded .hero-para { opacity: 1; transform: translateY(0); }

        /* ── Scroll cue at the base of the hero ── */
        @keyframes scroll-cue-bob {
          0%, 100% { transform: translateY(0); opacity: 0.55; }
          50%      { transform: translateY(8px); opacity: 1; }
        }
        .hero-scroll-cue { animation: scroll-cue-bob 2.2s ease-in-out infinite; }

        /* ── Standard hover cards ── */
        .standard-hover-card {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .standard-hover-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 30px -10px rgba(30,58,138,0.18), 0 0 0 1px rgba(249,115,22,0.25);
          border-color: rgba(249,115,22,0.35);
        }
        .standard-hover-media {
          overflow: hidden;
        }
        .standard-hover-media img {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease;
        }
        .standard-hover-card:hover .standard-hover-media img {
          transform: scale(1.08);
          filter: saturate(1.12) brightness(1.03);
        }
        .standard-hover-underline {
          display: inline-block;
          position: relative;
        }
        .standard-hover-underline::after {
          content: '';
          position: absolute;
          left: 0; bottom: -3px;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #f97316, #ef4444);
          transition: width 0.35s ease;
        }
        .standard-hover-card:hover .standard-hover-underline::after {
          width: 100%;
        }

        @media (prefers-reduced-motion: reduce) {
          .float-anim, .hero-shadow, .hero-glow-a, .hero-glow-b,
          .hero-ring-1, .hero-ring-2, .hero-sparkle, .hero-scroll-cue,
          .hero-rim-light, .hero-ember, .hero-sheen::after {
            animation: none !important;
          }
          .hero-dish-tilt, .hero-dish-scale, .standard-hover-card, .standard-hover-media img {
            transition: none !important;
            transform: none !important;
          }
        }

        .modal-sb::-webkit-scrollbar       { width: 5px; }
        .modal-sb::-webkit-scrollbar-track { background: #e2e8f0; border-radius: 8px; }
        .modal-sb::-webkit-scrollbar-thumb { background: #1e3a8a; border-radius: 8px; }
      `}</style>

      <div className="bg-fixed-layer" aria-hidden="true" />

      {(() => {
        const navbarProps = ({
          restaurants,
          onSelectMenu: (id: any) => {
            setActiveMenuId(id);
            document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
          },
        } as any);
        return <Navbar {...navbarProps} />;
      })()}
      <CartDrawer />

      <div className="page-content">

        {/* ── HERO ── */}
        <section
          id="home"
          ref={heroRef}
          onPointerMove={handleHeroPointerMove}
          onPointerEnter={() => setHeroHover(true)}
          onPointerLeave={handleHeroPointerLeave}
          className={`hero-section relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden ${heroHover ? 'is-hovering' : ''}`}
        >
          <div className="container mx-auto px-6 md:px-12 max-w-[1100px] relative">

            {/* Scattered sparkle accents */}
            <div className="absolute -top-4 left-[8%] w-2 h-2 rounded-full bg-orange-400 hero-sparkle hidden md:block" aria-hidden="true" style={{ animationDelay: '0.4s' }} />
            <div className="absolute top-1/3 left-[2%] w-1.5 h-1.5 rounded-full bg-blue-700 hero-sparkle hidden lg:block" aria-hidden="true" style={{ animationDelay: '1.1s' }} />
            <div className="absolute bottom-10 left-[18%] w-2 h-2 rounded-full bg-red-500 hero-sparkle hidden md:block" aria-hidden="true" style={{ animationDelay: '1.8s' }} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center text-center lg:text-left">
              <div className={heroLoaded ? 'hero-loaded' : ''}>
                <h2 className="hero-eyebrow text-xl md:text-2xl font-medium text-blue-900 mb-3 tracking-tight">
                  <span className="hero-eyebrow-rule" aria-hidden="true" />
                  Dine With Tahera
                </h2>
                <h1 className="text-[44px] md:text-[68px] lg:text-[76px] font-bold text-blue-950 leading-[1.05] mb-7 mx-auto lg:mx-0 max-w-lg">
                  <span className="hero-line"><span style={{ transitionDelay: '120ms' }}>A Tapestry  </span></span>
                  <span className="hero-line"><span style={{ transitionDelay: '240ms' }}>of Asian</span></span>
                  <span className="hero-line"><span style={{ transitionDelay: '360ms' }}>Flavours</span></span>
                </h1>
                <p className="hero-para text-base md:text-lg text-slate-600 leading-relaxed font-light max-w-md mx-auto lg:mx-0" style={{ transitionDelay: '520ms' }}>
Savor the perfect blend of Pakistani, Indian, and Chinese cuisine. From hearty breakfasts to grand dinners, enjoy vibrant comfort food crafted to satisfy every craving        </p>
              </div>

              <FadeRight className="relative flex justify-center lg:justify-end items-center h-[340px] md:h-[520px] mt-2 lg:mt-0">

                {/* Ambient glow blobs filling the space around the dish */}
                <div className="hero-glow-a absolute w-[260px] h-[260px] md:w-[380px] md:h-[380px] rounded-full bg-orange-300/30 blur-3xl pointer-events-none" aria-hidden="true" />
                <div className="hero-glow-b absolute w-[220px] h-[220px] md:w-[320px] md:h-[320px] rounded-full bg-blue-500/25 blur-3xl pointer-events-none translate-x-10 translate-y-6" aria-hidden="true" />

                {/* Orbiting dashed rings around the dish */}
                <svg className="hero-ring-1 absolute w-[300px] h-[300px] md:w-[460px] md:h-[460px] pointer-events-none" viewBox="0 0 460 460" aria-hidden="true">
                  <circle cx="230" cy="230" r="210" fill="none" stroke="#f97316" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="2 14" />
                </svg>
                <svg className="hero-ring-2 absolute w-[250px] h-[250px] md:w-[390px] md:h-[390px] pointer-events-none" viewBox="0 0 390 390" aria-hidden="true">
                  <circle cx="195" cy="195" r="178" fill="none" stroke="#1e3a8a" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="1 10" />
                </svg>

                {/* Small accent dots carried around the outer ring */}
                <div className="hero-ring-1 absolute w-[300px] h-[300px] md:w-[460px] md:h-[460px] pointer-events-none" aria-hidden="true">
                  <span className="hero-orbit-dot absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-orange-500" />
                </div>
                <div className="hero-ring-2 absolute w-[250px] h-[250px] md:w-[390px] md:h-[390px] pointer-events-none" aria-hidden="true">
                  <span className="hero-orbit-dot absolute bottom-2 left-[15%] w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-blue-700" />
                </div>

                {/* Contact shadow grounding the floating plate */}
                <div className="hero-shadow absolute left-1/2 bottom-[14%] w-[180px] md:w-[260px] h-[26px] md:h-[34px] bg-blue-950/40 blur-xl rounded-full pointer-events-none" aria-hidden="true" />

                {/* Tilt wrapper: rotates toward the cursor on hover */}
                <div ref={dishWrapRef} className="hero-dish-tilt relative">

                  {/* Premium rim-light: traces along the plate's own circular edge, only on hover */}
                  <div className="hero-rim-light" aria-hidden="true" />

                  {/* Sheen sweep across the dish on hover-enter */}
                  <div className="hero-sheen" aria-hidden="true" />

                  {/* Drifting embers rising past the dish on hover */}
                  <span className="hero-ember w-1.5 h-1.5" style={{ left: '18%', bottom: '10%', animationDelay: '0s' }} aria-hidden="true" />
                  <span className="hero-ember w-1 h-1" style={{ left: '72%', bottom: '6%', animationDelay: '0.6s' }} aria-hidden="true" />
                  <span className="hero-ember w-1.5 h-1.5" style={{ left: '48%', bottom: '2%', animationDelay: '1.2s' }} aria-hidden="true" />
                  <span className="hero-ember w-1 h-1" style={{ left: '30%', bottom: '14%', animationDelay: '1.8s' }} aria-hidden="true" />

                  <div className="hero-dish-scale relative w-[280px] h-[280px] md:w-[420px] md:h-[420px] float-anim">
                    <Image src="/transparent-dish.png" alt="Tahera Signature Dish" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain drop-shadow-[0_18px_28px_rgba(30,58,138,0.15)]" priority />
                  </div>
                </div>
              </FadeRight>
            </div>

            {/* Scroll cue */}
            <div className="hidden md:flex hero-scroll-cue absolute left-1/2 -translate-x-1/2 bottom-[-2rem] flex-col items-center gap-2 text-blue-900/50" aria-hidden="true">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase">Scroll</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </section>

        {/* ── BRANCHES GRID ── */}
        <section id="restaurants" className="pb-16 pt-16">
          <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
            <FadeUp className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-950 tracking-tight">Our Locations</h2>
              <p className="text-slate-500 mt-3">Find a Tahera Restaurant near you.</p>
            </FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
              {restaurants.map((b, idx) => (
                <FadeUp key={b.id} delay={idx * 50}>
                  <Link
                    href={`/restaurants/${b.id}`}
                    className="group cursor-pointer bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-blue-100 flex flex-col hover:-translate-y-1 transition-all duration-300 h-full relative"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image src={b.cover} alt={b.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      {b.openingSoon && (
                        <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300 group-hover:bg-blue-950/60">
                          <span className="bg-red-600 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-md shadow-md transform -rotate-2">
                            Coming Soon
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col text-center border-t border-slate-50">
                      <h3 className="text-lg font-bold text-blue-950 mb-1.5 group-hover:text-blue-700 transition-colors">{b.name}</h3>
                      <p className="text-slate-500 text-sm line-clamp-2">{b.description}</p>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── MENU ── */}
        {/* <section id="menu" className="py-20 bg-slate-50/50">
          <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
            <FadeUp className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-950 tracking-tight">
                Menu - {activeRestaurantMenu.name}
              </h2>
              <p className="text-slate-500 mt-3">
                Discover the dishes currently being served at our {activeRestaurantMenu.location} location.
              </p>
            </FadeUp>

            {activeRestaurantMenu.openingSoon || activeRestaurantMenu.menu.length === 0 ? (
              <FadeUp className="flex flex-col items-center justify-center py-16 bg-white border border-blue-100 rounded-2xl shadow-sm text-center">
                <h3 className="text-2xl font-bold text-blue-950 mb-2">Preparing the Kitchen!</h3>
                <p className="text-slate-500 max-w-md">Our menu for this location is currently being crafted. Check back soon for our delicious offerings.</p>
              </FadeUp>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeRestaurantMenu.menu.map((d, i) => (
                  <FadeUp key={i} delay={i * 80}>
                    <div className="group bg-white backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                      <div className="relative h-48 overflow-hidden">
                        <Image src={d.img} alt={d.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-bold text-red-600 shadow-sm">{d.price}</div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-blue-950 mb-2">{d.name}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-5">{d.desc}</p>
                        <button 
                          onClick={() => addToCart(d.name, d.price)}
                          className="w-full py-2.5 text-sm font-bold text-white bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors duration-300 shadow-sm"
                        >
                          Add to Order
                        </button>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            )}
          </div>
        </section> */}

        {/* ── GALLERY ── */}
        <section id="gallery" className="py-20">
          <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
            <FadeUp className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-950 tracking-tight">Our Gallery</h2>
              <p className="text-slate-500 mt-3">A glimpse into the Tahera experience.</p>
            </FadeUp>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <FadeLeft className="col-span-2 row-span-2 relative h-72 md:h-[480px] rounded-2xl overflow-hidden group shadow-md">
                <Image src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800" alt="Grill" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </FadeLeft>
              {galleryImages.map((src, i) => (
                <FadeRight key={i} delay={i * 80} className="relative h-44 md:h-auto rounded-2xl overflow-hidden group shadow-md">
                  <Image src={src} alt={`Gallery ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </FadeRight>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="py-20 bg-blue-950 text-white">
          <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
              <FadeLeft className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Crafted with passion, served with pride.</h2>
                <p className="text-blue-200 leading-relaxed font-light mx-auto lg:mx-0 max-w-lg">
                  Founded in the vibrant streets of Dubai, Tahera brings the rich, aromatic heritage of Pakistan and the Middle East to your table. We believe that food is an experience that brings families and friends together.
                </p>
                
                <div className="pt-4">
                  <Link 
                    href="/about" 
                    className="inline-flex items-center justify-center gap-2 bg-white text-blue-950 px-8 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    Explore Our Story 
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </Link>
                </div>

              </FadeLeft>
              <FadeDown className="relative h-[300px] sm:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-900">
                <Image src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000" alt="Restaurant Interior" fill className="object-cover" />
              </FadeDown>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer id="contact" className="bg-slate-50 border-t border-slate-200 py-8">
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
                  <a href="mailto:tahera@gmail.com" className="text-sm text-slate-600 hover:text-red-600 transition-colors font-medium">
                    tahera@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-5">
                  <a href="#" aria-label="Instagram" className="text-slate-400 hover:text-red-600 transition-transform hover:scale-110">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="#" aria-label="TikTok" className="text-slate-400 hover:text-red-600 transition-transform hover:scale-110">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.61-.6 3.19-1.74 4.3-1.14 1.12-2.73 1.75-4.34 1.75-1.58.01-3.15-.57-4.3-1.64-1.14-1.06-1.84-2.58-1.93-4.17-.09-1.57.48-3.15 1.56-4.25 1.07-1.1 2.58-1.76 4.16-1.84v4.03c-.44.05-.88.2-1.25.46-.37.25-.66.6-.82 1.01-.15.4-.2.85-.12 1.28.08.43.32.81.65 1.08.34.27.76.4 1.19.38.43-.02.83-.2 1.15-.49.32-.29.54-.68.64-1.11.1-.43.08-.88-.06-1.29l-.02-12.83z"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="Facebook" className="text-slate-400 hover:text-red-600 transition-transform hover:scale-110">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
              <p className="text-center md:text-left">© {new Date().getFullYear()} Tahera Restaurant. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="/privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-slate-600 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   ROOT EXPORT WITH CART PROVIDER
══════════════════════════════════════════ */
export default function Home() {
  return (
    <CartProvider>
      <HomeContent />
    </CartProvider>
  );
}