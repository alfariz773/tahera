'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Navbar from './components/Navbar';
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
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? '#EF4444' : 'none'} stroke={filled ? '#EF4444' : '#fca5a5'} strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
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
const IconBadge = ({ icon }: { icon: 'phone' | 'mail' }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: 32, height: 32, borderRadius: '50%',
    background: 'rgba(239,68,68,0.10)', flexShrink: 0,
  }}>
    {icon === 'phone' ? (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.88 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ) : (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    )}
  </span>
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

const offers = [
  { title: 'Family Dinner',  sub: 'Feeds 4–5', desc: '1 Large Biryani, 2 Karahis, Mixed Grill, Drinks.',       price: 'AED 199'  },
  { title: 'Weekend Buffet', sub: 'Sat & Sun', desc: 'Unlimited access to over 40 dishes & live stations.',      price: 'AED 89/p' },
  { title: 'Business Lunch', sub: '12pm–4pm',  desc: 'Main course, salad, soup, and beverage.',                 price: 'AED 45'   },
];

const phoneNumbers = ['+971 50 597 2959', '+971 52 641 9506', '+971 4 352 4415'];
const locations    = ['JVC', 'Port Saeed', 'Arjan', 'Meena Bazaar', 'Bur Dubai', 'T Grills JVC', 'T Grill Marjan', 'Production City'];
const weekdays     = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday', 'Sunday'];

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function Home() {
  const [showAll, setShowAll] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Restaurant | null>(null);
  const [reviewForm, setReviewForm] = useState(false);

  // Lock body scroll when the main page modal is open
  useEffect(() => {
    document.body.style.overflow = selectedBranch ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedBranch]);

  // Show 6 working branches initially, show all 8 if "View All" is clicked
  const displayedRestaurants = showAll ? restaurants : restaurants.slice(0, 6);

  return (
    <div className="min-h-screen font-sans text-gray-900 overflow-x-hidden" style={{ background: '#fff' }}>

      <style>{`
        html { scroll-behavior: smooth; }
        .bg-fixed-layer {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 55% 45% at  2% 10%,  rgba(252,165,165,0.38) 0%, transparent 60%),
            radial-gradient(ellipse 45% 35% at 98% 22%,  rgba(254,215,170,0.32) 0%, transparent 55%),
            radial-gradient(ellipse 50% 38% at  5% 52%,  rgba(254,226,226,0.28) 0%, transparent 58%),
            radial-gradient(ellipse 48% 32% at 96% 62%,  rgba(252,165,165,0.25) 0%, transparent 52%),
            radial-gradient(ellipse 52% 36% at  8% 88%,  rgba(254,215,170,0.30) 0%, transparent 56%),
            radial-gradient(ellipse 44% 30% at 92% 95%,  rgba(252,165,165,0.26) 0%, transparent 50%);
        }
        .page-content { position: relative; z-index: 1; }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-14px); }
        }
        .float-anim { animation: float 6s ease-in-out infinite; }
        .modal-sb::-webkit-scrollbar       { width: 5px; }
        .modal-sb::-webkit-scrollbar-track { background: #fee2e2; border-radius: 8px; }
        .modal-sb::-webkit-scrollbar-thumb { background: #fca5a5; border-radius: 8px; }
      `}</style>

      <div className="bg-fixed-layer" aria-hidden="true" />

      <Navbar />

      <div className="page-content">

        {/* ── HERO ── */}
        <section id="home" className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 max-w-[1100px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center">
              <FadeLeft>
                <h2 className="text-xl md:text-2xl font-medium text-gray-700 mb-3 tracking-tight">Welcome to Tahera Restaurant</h2>
                <h1 className="text-[50px] md:text-[68px] lg:text-[76px] font-bold text-[#111827] leading-[1.05] mb-7">
                  Authentic<br />Flavours<br />of Dubai
                </h1>
                <p className="text-lg text-gray-500 leading-relaxed font-light max-w-md">
                  From hearty breakfasts to satisfying lunches and dinner favourites, our menu offers comfort food with vibrant flavours that keep guests coming back.
                </p>
              </FadeLeft>
              <FadeRight className="flex justify-center lg:justify-end items-center h-[360px] md:h-[450px] mt-6 lg:mt-0">
                <div className="relative w-[300px] h-[300px] md:w-[420px] md:h-[420px] float-anim">
                  <Image src="/transparent-dish.png" alt="Tahera Signature Dish" fill className="object-contain drop-shadow-[0_18px_28px_rgba(239,68,68,0.16)]" priority />
                </div>
              </FadeRight>
            </div>
          </div>
        </section>

        {/* ── BRANCHES BUTTON ── */}
        <section className="py-10">
          <div className="container mx-auto px-6 text-center">
            <FadeUp>
              <button
                onClick={() => setShowAll((v) => !v)}
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-10 py-4 rounded-lg font-semibold text-base transition-all shadow-lg hover:-translate-y-0.5 active:scale-95"
              >
                {showAll ? 'Show Less' : 'View All 8 Branches'}
              </button>
            </FadeUp>
          </div>
        </section>

        {/* ── BRANCHES GRID ── */}
        <section id="restaurants" className="pb-16 pt-6">
          <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {displayedRestaurants.map((b, idx) => (
                <FadeUp key={b.id} delay={idx * 90}>
                  <div
                    onClick={() => { setSelectedBranch(b); setReviewForm(false); }}
                    className="group cursor-pointer bg-white/65 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-red-100/50 flex flex-col hover:-translate-y-1 transition-all duration-300 h-full relative"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={b.cover}
                        alt={b.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* elegant badge for Coming Soon in the grid */}
                      {b.openingSoon && (
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/50">
                          <span className="bg-red-500 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-md shadow-md transform -rotate-2">
                            Coming Soon
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col text-center border-t border-red-50">
                      <h3 className="text-lg font-bold text-gray-900 mb-1.5 group-hover:text-red-500 transition-colors">
                        {b.name}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2">{b.description}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── MENU ── */}
        <section id="menu" className="py-20">
          <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
            <FadeUp className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Curated Menu</h2>
              <p className="text-gray-500 mt-3">Discover our most loved dishes prepared with fresh ingredients.</p>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((d, i) => (
                <FadeUp key={i} delay={i * 120}>
                  <div className="group bg-white/65 backdrop-blur-sm rounded-2xl overflow-hidden border border-red-100/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image src={d.img} alt={d.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-bold text-red-600 shadow-sm">{d.price}</div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{d.name}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">{d.desc}</p>
                      <button className="w-full py-2.5 text-sm font-bold text-red-500 bg-red-50/60 rounded-lg group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                        Add to Order
                      </button>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section id="gallery" className="py-20">
          <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
            <FadeUp className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Our Gallery</h2>
              <p className="text-gray-500 mt-3">A glimpse into the Tahera experience.</p>
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

        {/* ── OFFERS ── */}
        <section id="offers" className="py-20">
          <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
            <FadeUp className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Exclusive Offers</h2>
              <p className="text-gray-500">Enjoy premium dining at unbeatable values.</p>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((o, i) => (
                <FadeUp key={i} delay={i * 120}>
                  <div className="bg-white/65 backdrop-blur-md border border-red-100/50 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full">
                    <span className="px-3 py-1 bg-red-100 text-red-600 w-max rounded-full text-[11px] font-bold uppercase mb-4">{o.sub}</span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{o.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">{o.desc}</p>
                    <div className="flex justify-between items-center border-t border-red-100/50 pt-4">
                      <span className="text-xl font-extrabold text-red-500">{o.price}</span>
                      <button className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors uppercase tracking-wide">Claim</button>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="py-20">
          <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeLeft className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Crafted with passion, served with pride.</h2>
                <p className="text-gray-600 leading-relaxed font-light">
                  Founded in the vibrant streets of Dubai, Tahera brings the rich, aromatic heritage of Pakistan and the Middle East to your table. We believe that food is an experience that brings families and friends together.
                </p>
              </FadeLeft>
              <FadeDown className="relative h-[300px] sm:h-[400px] w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white/70">
                <Image src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000" alt="Restaurant Interior" fill className="object-cover" />
              </FadeDown>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer id="contact" className="border-t border-red-200/50 py-16 mt-8">
          <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

              <FadeUp delay={0}>
                <div className="flex flex-col items-start mb-5">
                  <Image src="/logo.jpeg" alt="Tahera Logo" width={48} height={48} className="rounded-full shadow-sm object-contain" />
                  <span className="font-bold text-[10px] tracking-widest text-gray-900 uppercase mt-2">Tahera</span>
                  <span className="text-[10px] tracking-widest text-gray-400 uppercase">Restaurant</span>
                </div>
                <h4 className="text-gray-900 font-bold mb-3 text-sm uppercase tracking-wider">Our Locations</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  {locations.map((l) => <li key={l}>{l}</li>)}
                </ul>
              </FadeUp>

              <FadeUp delay={100}>
                <h4 className="text-gray-900 font-bold mb-4 text-sm uppercase tracking-wider">Phone</h4>
                <ul className="space-y-3 mb-7">
                  {phoneNumbers.map((n) => (
                    <li key={n} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <IconBadge icon="phone" />
                      <span className="text-sm text-gray-500">{n}</span>
                    </li>
                  ))}
                </ul>
                <h4 className="text-gray-900 font-bold mb-4 text-sm uppercase tracking-wider">Email</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <IconBadge icon="mail" />
                  <span className="text-sm text-gray-500">salmanntechs@gmail.com</span>
                </div>
              </FadeUp>

              <FadeUp delay={200}>
                <h4 className="text-gray-900 font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
                <ul className="space-y-3 text-sm text-gray-500">
                  <li><a href="#about"   className="hover:text-red-500 transition-colors">About Us</a></li>
                  <li><a href="#contact" className="hover:text-red-500 transition-colors">Contact Us</a></li>
                  <li><a href="#home"    className="hover:text-red-500 transition-colors">Home</a></li>
                </ul>
              </FadeUp>

              <FadeUp delay={300}>
                <h4 className="text-gray-900 font-bold mb-4 text-sm uppercase tracking-wider">Opening Hours</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  {weekdays.map((d) => <li key={d}>{d} — Open 24 hours</li>)}
                  <li className="text-red-500 font-semibold">Friday — Open 24 hours</li>
                </ul>
              </FadeUp>

            </div>
          </div>
        </footer>

      </div>

      {/* ── Modal Rendering logic ── */}
      {selectedBranch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/55 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border-t-4 border-red-500 relative">

            <button
              onClick={() => setSelectedBranch(null)}
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-red-500 p-2 rounded-full shadow-sm transition-colors"
            >
              <ModalCloseIcon />
            </button>

            <div className="relative h-60 shrink-0">
              <Image src={selectedBranch.cover} alt={selectedBranch.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-6 right-6 flex flex-col items-start gap-2">
                {selectedBranch.openingSoon && (
                  <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-md">
                    Opening Soon
                  </span>
                )}
                <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedBranch.name}</h2>
                <p className="text-red-200 flex items-center gap-1.5 mt-1 text-sm font-medium">
                  <MapPinIcon />{selectedBranch.location}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-9 modal-sb bg-white">
              <p className="text-base text-gray-700 leading-relaxed mb-8 border-b border-red-100 pb-5">
                {selectedBranch.description}
              </p>

              {selectedBranch.openingSoon ? (
                // COMING SOON LAYOUT
                <div className="flex flex-col items-center justify-center py-12 bg-red-50/50 border border-red-100 rounded-xl text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Ready!</h3>
                  <p className="text-gray-500 text-lg max-w-md">We are preparing something special for you. Stay tuned for our full menu and grand opening dates.</p>
                </div>
              ) : (
                // STANDARD MENU/REVIEW LAYOUT
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Specialties */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-5">Specialties</h3>
                    <div className="space-y-3">
                      {selectedBranch.menu.map((d, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center p-4 rounded-xl border border-red-100 bg-red-50/25 hover:border-red-300 transition-colors"
                        >
                          <span className="font-semibold text-gray-800 text-sm">{d.name}</span>
                          <span className="text-red-500 font-bold text-sm">{d.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reviews */}
                  <div>
                    <div className="flex justify-between items-center mb-5">
                      <h3 className="text-xl font-bold text-gray-900">Guest Reviews</h3>
                      <button
                        onClick={() => setReviewForm((r) => !r)}
                        className="text-sm font-bold text-red-500 hover:text-red-600 underline underline-offset-4"
                      >
                        {reviewForm ? 'Cancel' : 'Add Review'}
                      </button>
                    </div>

                    {reviewForm ? (
                      <div className="bg-red-50/40 p-5 rounded-xl border border-red-100 space-y-3">
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="w-full p-3 rounded-lg border border-red-200 text-sm focus:outline-none focus:ring-1 focus:ring-red-400"
                        />
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <StarIcon key={i} filled={i <= 4} />
                          ))}
                        </div>
                        <textarea
                          rows={3}
                          placeholder="Write a review..."
                          className="w-full p-3 rounded-lg border border-red-200 text-sm focus:outline-none focus:ring-1 focus:ring-red-400"
                        />
                        <button
                          onClick={() => { alert('Review submitted!'); setReviewForm(false); }}
                          className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-colors text-sm"
                        >
                          Submit
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {selectedBranch.reviews.map((r, i) => (
                          <div key={i} className="p-4 rounded-xl border border-red-100 bg-white shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-bold text-gray-900 text-sm">{r.author}</span>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, j) => (
                                  <StarIcon key={j} filled={j < r.rating} />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-500 text-sm italic">"{r.text}"</p>
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