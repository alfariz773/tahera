'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
// We now import BOTH useCart and the CartProvider here!
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

/* ── Icons ── */
const StarIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? '#DC2626' : 'none'} stroke={filled ? '#DC2626' : '#fca5a5'} strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const ModalCloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

/* ── Static data ── */
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
  const [selectedBranch, setSelectedBranch] = useState<Restaurant | null>(null);
  const [reviewForm, setReviewForm] = useState(false);
  
  // State to track which restaurant's menu is showing in the homepage section
  const [activeMenuId, setActiveMenuId] = useState<string>(restaurants[0].id);

  // We are now safely inside the CartProvider!
  const { addToCart } = useCart(); 

  // Lock body scroll when the main page modal is open
  useEffect(() => {
    document.body.style.overflow = selectedBranch ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedBranch]);

  // Find the currently selected restaurant for the menu section
  const activeRestaurantMenu = restaurants.find(r => r.id === activeMenuId) || restaurants[0];

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
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-14px); }
        }
        .float-anim { animation: float 6s ease-in-out infinite; }
        .modal-sb::-webkit-scrollbar       { width: 5px; }
        .modal-sb::-webkit-scrollbar-track { background: #e2e8f0; border-radius: 8px; }
        .modal-sb::-webkit-scrollbar-thumb { background: #1e3a8a; border-radius: 8px; }
      `}</style>

      <div className="bg-fixed-layer" aria-hidden="true" />

      {/* ── Render Navbar and CartDrawer ── */}
      <Navbar 
        restaurants={restaurants} 
        onSelectMenu={(id) => {
          setActiveMenuId(id);
          // Auto-scroll to the menu section
          document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
        }} 
      />
      <CartDrawer />

      <div className="page-content">

        {/* ── HERO ── */}
        <section id="home" className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 max-w-[1100px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center text-center lg:text-left">
              <FadeLeft>
                <h2 className="text-xl md:text-2xl font-medium text-blue-900 mb-3 tracking-tight">Welcome to Tahera Restaurant</h2>
                <h1 className="text-[44px] md:text-[68px] lg:text-[76px] font-bold text-blue-950 leading-[1.05] mb-7 mx-auto lg:mx-0 max-w-lg">
                  Authentic<br />Flavours<br />of Dubai
                </h1>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed font-light max-w-md mx-auto lg:mx-0">
                  From hearty breakfasts to satisfying lunches and dinner favourites, our menu offers comfort food with vibrant flavours that keep guests coming back.
                </p>
              </FadeLeft>
              <FadeRight className="flex justify-center lg:justify-end items-center h-[300px] md:h-[450px] mt-2 lg:mt-0">
                <div className="relative w-[280px] h-[280px] md:w-[420px] md:h-[420px] float-anim">
                  <Image src="/transparent-dish.png" alt="Tahera Signature Dish" fill className="object-contain drop-shadow-[0_18px_28px_rgba(30,58,138,0.15)]" priority />
                </div>
              </FadeRight>
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
                  <div
                    onClick={() => { setSelectedBranch(b); setReviewForm(false); }}
                    className="group cursor-pointer bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-blue-100 flex flex-col hover:-translate-y-1 transition-all duration-300 h-full relative"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image src={b.cover} alt={b.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
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
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── MENU ── */}
        <section id="menu" className="py-20 bg-slate-50/50">
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
        </section>

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
              </FadeLeft>
              <FadeDown className="relative h-[300px] sm:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-900">
                <Image src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000" alt="Restaurant Interior" fill className="object-cover" />
              </FadeDown>
            </div>
          </div>
        </section>

        {/* ── ULTRA-SLEEK HORIZONTAL FOOTER ── */}
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
                <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

      </div>

      {/* ── Modal Rendering logic ── */}
      {selectedBranch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-blue-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border-t-4 border-blue-900 relative">

            <button
              onClick={() => setSelectedBranch(null)}
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-blue-900 p-2 rounded-full shadow-sm transition-colors"
            >
              <ModalCloseIcon />
            </button>

            <div className="relative h-48 md:h-60 shrink-0">
              <Image src={selectedBranch.cover} alt={selectedBranch.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/40 to-transparent" />
              <div className="absolute bottom-5 left-6 right-6 flex flex-col items-start gap-2">
                {selectedBranch.openingSoon && (
                  <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-md">
                    Opening Soon
                  </span>
                )}
                <h2 className="text-xl md:text-3xl font-bold text-white">{selectedBranch.name}</h2>
                <p className="text-blue-100 flex items-center gap-1.5 mt-1 text-xs md:text-sm font-medium">
                  <MapPinIcon />{selectedBranch.location}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 md:p-9 modal-sb bg-white">
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6 border-b border-blue-50 pb-5">
                {selectedBranch.description}
              </p>

              {selectedBranch.openingSoon ? (
                <div className="flex flex-col items-center justify-center py-10 md:py-12 bg-blue-50/50 border border-blue-100 rounded-xl text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-blue-950 mb-2">Get Ready!</h3>
                  <p className="text-slate-500 text-sm md:text-lg max-w-md">We are preparing something special for you. Stay tuned for our full menu and grand opening dates.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  {/* Specialties */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-blue-950 mb-4 md:mb-5">Specialties</h3>
                    <div className="space-y-3">
                      {selectedBranch.menu.map((d, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center p-3 md:p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
                        >
                          <span className="font-semibold text-slate-800 text-xs md:text-sm">{d.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-red-600 font-bold text-xs md:text-sm">{d.price}</span>
                            <button
                              onClick={() => addToCart(d.name, d.price)}
                              className="bg-blue-900 text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors text-lg pb-0.5 shadow-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reviews */}
                  <div>
                    <div className="flex justify-between items-center mb-4 md:mb-5">
                      <h3 className="text-lg md:text-xl font-bold text-blue-950">Guest Reviews</h3>
                      <button
                        onClick={() => setReviewForm((r) => !r)}
                        className="text-xs md:text-sm font-bold text-blue-900 hover:text-blue-700 underline underline-offset-4"
                      >
                        {reviewForm ? 'Cancel' : 'Add Review'}
                      </button>
                    </div>

                    {reviewForm ? (
                      <div className="bg-blue-50/50 p-4 md:p-5 rounded-xl border border-blue-100 space-y-3">
                        <input type="text" placeholder="Your Name" className="w-full p-2.5 md:p-3 rounded-lg border border-blue-200 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} filled={i <= 4} />)}
                        </div>
                        <textarea rows={3} placeholder="Write a review..." className="w-full p-2.5 md:p-3 rounded-lg border border-blue-200 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
                        <button onClick={() => { alert('Review submitted!'); setReviewForm(false); }} className="w-full bg-blue-900 text-white font-bold py-2.5 md:py-3 rounded-lg hover:bg-blue-800 transition-colors text-xs md:text-sm">Submit</button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {selectedBranch.reviews.map((r, i) => (
                          <div key={i} className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-bold text-slate-900 text-xs md:text-sm">{r.author}</span>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, j) => <StarIcon key={j} filled={j < r.rating} />)}
                              </div>
                            </div>
                            <p className="text-slate-500 text-xs md:text-sm italic">"{r.text}"</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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