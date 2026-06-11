'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Restaurant } from '../data/restaurants';
import { useCart } from '../context/CartContext'; // <-- 1. Import the Cart Context

/* ── Icons ── */
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);
const StarIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? '#EF4444' : 'none'} stroke={filled ? '#EF4444' : '#fca5a5'} strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,display:'block'}}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

type Props = { restaurant: Restaurant; onClose: () => void; };

type NewReview = { author: string; rating: number; text: string; };

export default function RestaurantModal({ restaurant, onClose }: Props) {
  const [reviews, setReviews]       = useState(restaurant.reviews);
  const [showForm, setShowForm]     = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [form, setForm]             = useState<NewReview>({ author: '', rating: 0, text: '' });
  const [submitted, setSubmitted]   = useState(false);

  // <-- 2. Get the addToCart function from the hook
  const { addToCart } = useCart(); 

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white w-full max-w-4xl max-h-[93vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col relative border-t-4 border-red-500">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white text-red-500 p-2 rounded-full shadow-md transition-all hover:scale-110"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1" style={{scrollbarWidth:'thin', scrollbarColor:'#fca5a5 #fee2e2'}}>

          {/* ── Cover photo ── */}
          <div className="relative h-56 sm:h-72 w-full shrink-0">
            <Image src={restaurant.cover} alt={restaurant.name} fill className="object-cover" priority />
            <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)'}}/>
            <div className="absolute bottom-5 left-5 right-14">
              {/* Coming Soon Badge */}
              {restaurant.openingSoon && (
                <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md mb-2 inline-block">
                  Opening Soon
                </span>
              )}
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">{restaurant.name}</h2>
              <div className="flex items-center gap-1.5 mt-2 text-red-200 text-sm">
                <MapPinIcon />
                <span>{restaurant.address}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= Math.round(Number(avgRating))} />)}
                </div>
                <span className="text-white/80 text-sm font-semibold">{avgRating} · {reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-8 space-y-10">

            {/* ── Description ── */}
            <p className="text-gray-600 leading-relaxed text-base border-l-4 border-red-400 pl-4 italic">
              {restaurant.description}
            </p>

            {/* If Opening Soon, show a message instead of Map/Menu */}
            {restaurant.openingSoon ? (
              <div className="flex flex-col items-center justify-center py-12 bg-red-50 border border-red-100 rounded-2xl text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Ready!</h3>
                <p className="text-gray-500 text-lg max-w-md">We are preparing something special for you. Stay tuned for our full menu and grand opening dates.</p>
              </div>
            ) : (
              <>
                {/* ── Google Map ── */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 bg-red-500 rounded-full inline-block"/>
                    Find Us
                  </h3>
                  <div className="rounded-2xl overflow-hidden border border-red-100 shadow-md" style={{height:220}}>
                    <iframe
                      src={restaurant.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map for ${restaurant.name}`}
                    />
                  </div>
                </div>

                {/* ── Menu ── */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                    <span className="w-1 h-5 bg-red-500 rounded-full inline-block"/>
                    Our Menu
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {restaurant.menu.map((item, i) => (
                      <div
                        key={i}
                        className="group flex gap-3 p-3 rounded-xl border border-red-100/70 bg-white hover:border-red-300 hover:shadow-md transition-all duration-200"
                      >
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-red-100">
                          <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500"/>
                        </div>
                        <div className="flex flex-col justify-between flex-1 min-w-0">
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm leading-tight">{item.name}</h4>
                            <p className="text-gray-500 text-xs mt-1 leading-relaxed line-clamp-2">{item.desc}</p>
                          </div>
                          
                          {/* <-- 3. ADD TO CART BUTTON HERE --> */}
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-red-500 font-extrabold text-sm">{item.price}</span>
                            <button 
                              onClick={() => addToCart(item.name, item.price)}
                              className="bg-red-50 text-red-600 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
                            >
                              + Add
                            </button>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Reviews ── */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <span className="w-1 h-5 bg-red-500 rounded-full inline-block"/>
                      Guest Reviews
                      <span className="ml-1 px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs font-bold">{reviews.length}</span>
                    </h3>
                    <button
                      onClick={() => setShowForm((v) => !v)}
                      className={`text-sm font-bold px-4 py-2 rounded-lg transition-all ${
                        showForm
                          ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          : 'bg-red-500 text-white hover:bg-red-600 shadow-sm hover:shadow-md'
                      }`}
                    >
                      {showForm ? 'Cancel' : '+ Add Review'}
                    </button>
                  </div>

                  {/* Success toast */}
                  {submitted && (
                    <div className="mb-4 flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-semibold">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      Review submitted — thank you!
                    </div>
                  )}

                  {/* Add review form */}
                  {showForm && (
                    <div className="mb-6 p-5 rounded-2xl border border-red-200 bg-red-50/40 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Your Name</label>
                        <input
                          type="text"
                          value={form.author}
                          onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                          placeholder="e.g. Ahmed K."
                          className="w-full px-4 py-2.5 rounded-xl border border-red-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Rating</label>
                        <div className="flex gap-1.5">
                          {[1,2,3,4,5].map((i) => (
                            <button
                              key={i}
                              onMouseEnter={() => setHoverRating(i)}
                              onMouseLeave={() => setHoverRating(0)}
                              onClick={() => setForm((f) => ({ ...f, rating: i }))}
                              className="transition-transform hover:scale-125 focus:outline-none"
                            >
                              <StarIcon filled={i <= (hoverRating || form.rating)} />
                            </button>
                          ))}
                          {form.rating > 0 && (
                            <span className="ml-2 text-xs font-semibold text-red-500 self-center">
                              {['','Poor','Fair','Good','Great','Excellent'][form.rating]}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Your Review</label>
                        <textarea
                          rows={3}
                          value={form.text}
                          onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                          placeholder="Tell others about your experience..."
                          className="w-full px-4 py-2.5 rounded-xl border border-red-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 bg-white resize-none"
                        />
                      </div>
                      <button
                        onClick={handleSubmit}
                        disabled={!form.author.trim() || !form.rating || !form.text.trim()}
                        className="w-full py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                      >
                        Submit Review
                      </button>
                    </div>
                  )}

                  {/* Reviews list */}
                  <div className="space-y-4">
                    {reviews.length === 0 && (
                      <p className="text-center text-gray-400 py-8 text-sm">No reviews yet. Be the first!</p>
                    )}
                    {reviews.map((r, i) => (
                      <div key={i} className="p-4 rounded-2xl border border-red-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-400 to-orange-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
                              {r.author.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm">{r.author}</p>
                              <p className="text-gray-400 text-xs">{r.date}</p>
                            </div>
                          </div>
                          <div className="flex gap-0.5 shrink-0 mt-0.5">
                            {[1,2,3,4,5].map((j) => <StarIcon key={j} filled={j <= r.rating} />)}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mt-3 leading-relaxed pl-12">"{r.text}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}