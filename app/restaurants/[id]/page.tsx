'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import CartDrawer from '../../components/CartDrawer';
import { CartProvider, useCart } from '../../context/CartContext';
import { restaurants } from '../../data/restaurants';

/* ── Icons ── */
const StarIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? '#EF4444' : 'none'} stroke={filled ? '#EF4444' : '#fca5a5'} strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,display:'block'}}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

type NewReview = { author: string; rating: number; text: string; };

function RestaurantPageContent() {
  const params = useParams();
  const restaurantId = params.id as string;
  
  // Find the specific restaurant based on the URL
  const restaurant = restaurants.find(r => r.id === restaurantId);

  const [reviews, setReviews]       = useState(restaurant?.reviews || []);
  const [showForm, setShowForm]     = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [form, setForm]             = useState<NewReview>({ author: '', rating: 0, text: '' });
  const [submitted, setSubmitted]   = useState(false);

  const { addToCart } = useCart(); 

  // If the URL has an ID that doesn't exist, show a 404 state
  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Restaurant Not Found</h1>
        <Link href="/" className="text-red-500 font-bold hover:underline">← Back to Home</Link>
      </div>
    );
  }

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '—';

  function handleSubmit() {
    if (!form.author.trim() || !form.rating || !form.text.trim()) return;
    const now = new Date();
    const date = now.toLocaleString('en-US', { month: 'short', year: 'numeric' });
    setReviews((prev) => [{ ...form, date }, ...prev]);
    setForm({ author: '', rating: 0, text: '' });
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar restaurants={[]} />
      <CartDrawer />

      {/* ── HERO BANNER ── */}
      <div className="relative h-[40vh] md:h-[50vh] w-full pt-20">
        <Image src={restaurant.cover} alt={restaurant.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full pb-10">
          <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
            <Link href="/#restaurants" className="inline-flex items-center text-white/80 hover:text-white mb-4 text-sm font-medium transition-colors">
              ← Back to All Locations
            </Link>
            
            {restaurant.openingSoon && (
              <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-md mb-3 inline-block shadow-lg">
                Opening Soon
              </span>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight">
              {restaurant.name}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-white/90">
              <div className="flex items-center gap-2 font-medium">
                <MapPinIcon />
                <span>{restaurant.address}</span>
              </div>
              <div className="hidden sm:block text-white/40">•</div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= Math.round(Number(avgRating))} />)}
                </div>
                <span className="font-semibold">{avgRating} <span className="text-white/70 font-normal">({reviews.length} reviews)</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-[1200px] py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
          
          {/* ── LEFT COLUMN (Menu & Reviews) ── */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Menu Section */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-red-500 rounded-full inline-block"/>
                  The Menu
                </h2>
                <p className="text-gray-500 mt-2 ml-4">Order directly from the {restaurant.location} kitchen.</p>
              </div>

              {restaurant.openingSoon ? (
                <div className="bg-white border border-red-100 rounded-2xl p-12 text-center shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Preparing the Kitchen!</h3>
                  <p className="text-gray-500 max-w-md mx-auto">We are actively crafting the menu for this location. Check back soon for our delicious offerings.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {restaurant.menu.map((item, i) => (
                    <div key={i} className="group bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all duration-300 flex flex-col h-full">
                      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
                        <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h4 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h4>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{item.desc}</p>
                        
                        <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                          <span className="text-red-500 font-extrabold text-lg">{item.price}</span>
                          <button 
                            onClick={() => addToCart(item.name, item.price)}
                            className="bg-red-50 text-red-600 hover:bg-red-500 hover:text-white px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-sm"
                          >
                            + Add to Order
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-red-500 rounded-full inline-block"/>
                  Guest Reviews
                </h2>
                <button
                  onClick={() => setShowForm((v) => !v)}
                  className={`text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm ${
                    showForm ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-gray-900 text-white hover:bg-black'
                  }`}
                >
                  {showForm ? 'Cancel' : 'Write a Review'}
                </button>
              </div>

              {submitted && (
                <div className="mb-6 flex items-center gap-3 px-5 py-4 bg-green-50 border border-green-200 text-green-700 rounded-xl font-semibold shadow-sm animate-in fade-in slide-in-from-top-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Review submitted — thank you!
                </div>
              )}

              {showForm && (
                <div className="mb-8 p-6 md:p-8 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-5 animate-in fade-in slide-in-from-top-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your Name</label>
                    <input type="text" value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} placeholder="e.g. Ahmed K." className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-gray-50/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1,2,3,4,5].map((i) => (
                        <button key={i} onMouseEnter={() => setHoverRating(i)} onMouseLeave={() => setHoverRating(0)} onClick={() => setForm((f) => ({ ...f, rating: i }))} className="transition-transform hover:scale-125 focus:outline-none">
                          <StarIcon filled={i <= (hoverRating || form.rating)} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your Review</label>
                    <textarea rows={4} value={form.text} onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))} placeholder="Tell others about your experience..." className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-gray-50/50 resize-none" />
                  </div>
                  <button onClick={handleSubmit} disabled={!form.author.trim() || !form.rating || !form.text.trim()} className="w-full py-3.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg">
                    Submit Review
                  </button>
                </div>
              )}

              <div className="space-y-4">
                {reviews.length === 0 && (
                  <div className="text-center py-12 bg-white border border-gray-100 rounded-2xl">
                    <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
                  </div>
                )}
                {reviews.map((r, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center text-white font-bold shrink-0">
                          {r.author.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{r.author}</p>
                          <p className="text-gray-400 text-xs mt-0.5">{r.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        {[1,2,3,4,5].map((j) => <StarIcon key={j} filled={j <= r.rating} />)}
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed sm:pl-13">"{r.text}"</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN (Sidebar Info) ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              
              {/* Info Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">About This Location</h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-6 pb-6 border-b border-gray-100">
                  {restaurant.description}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="text-red-500 mt-0.5"><MapPinIcon /></div>
                    <span className="leading-relaxed">{restaurant.address}</span>
                  </div>
                </div>
              </div>

              {/* Map Card */}
              <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="w-full h-[250px] rounded-xl overflow-hidden relative">
                  <iframe
                    src={restaurant.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map for ${restaurant.name}`}
                    className="absolute inset-0"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function RestaurantPage() {
  return (
    <CartProvider>
      <RestaurantPageContent />
    </CartProvider>
  );
}