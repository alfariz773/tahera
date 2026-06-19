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
const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 shrink-0">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 shrink-0">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.88 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 shrink-0">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 shrink-0">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

/* ── Social Icons ── */
const InstagramIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const FacebookIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const TwitterIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z"></path></svg>;


function ContactContent() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen font-sans text-slate-900 overflow-x-hidden bg-slate-50">
      
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 50% 38% at 5% 52%, rgba(30, 58, 138, 0.05) 0%, transparent 58%)`
      }} />

      <Navbar/>
      

      <div className="relative z-10 pt-24 md:pt-32">
        
        {/* ── HERO SECTION ── */}
        <section className="container mx-auto px-6 md:px-12 max-w-[1200px] mb-12">
          <div className="bg-blue-950 rounded-[2rem] overflow-hidden relative shadow-2xl flex items-center min-h-[300px] md:min-h-[400px] px-8 md:px-16 py-12">
            <div className="absolute inset-0 z-0 opacity-30">
              <Image 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1600" 
                alt="Restaurant Dining" 
                fill 
                className="object-cover mix-blend-overlay"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/80 to-transparent"></div>
            </div>
            
            <div className="relative z-10 max-w-2xl">
              <FadeUp>
                <span className="text-red-400 font-bold tracking-widest uppercase text-sm mb-4 block">Get In Touch</span>
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
                  We'd Love to <br/> Hear From You.
                </h1>
                <p className="text-blue-200 text-lg md:text-xl font-light leading-relaxed">
                  Whether you have a question about our menu, want to book catering for an event, or just want to say hello.
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── MAIN CONTACT SECTION ── */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              
              {/* Left Column: Form (Spans 3 cols) */}
              <div className="lg:col-span-3">
                <FadeLeft>
                  <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm">
                    <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-2">Send us a Message</h2>
                    <p className="text-slate-500 mb-8 text-sm">Fill out the form below and our team will get back to you within 24 hours.</p>

                    {submitted ? (
                      <div className="bg-green-50 border border-green-200 text-green-700 p-8 rounded-2xl flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-500">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
                        <p className="text-green-600/80 text-sm">Thank you for reaching out. We will be in touch shortly.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Name and Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                            <input required type="text" name="name" value={formState.name} onChange={handleInputChange} placeholder="e.g. Salman Khan" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 bg-slate-50/50 transition-all" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                            <input required type="tel" name="phone" value={formState.phone} onChange={handleInputChange} placeholder="e.g. +971 50 123 4567" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 bg-slate-50/50 transition-all" />
                          </div>
                        </div>

                        {/* Email Address and Subject Input*/}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                            <input required type="email" name="email" value={formState.email} onChange={handleInputChange} placeholder="e.g. salman@example.com" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 bg-slate-50/50 transition-all" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subject</label>
                            <input required type="text" name="subject" value={formState.subject} onChange={handleInputChange} placeholder="e.g. Catering Request" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 bg-slate-50/50 transition-all text-slate-600 appearance-none" />
                          </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message</label>
                          <textarea required name="message" value={formState.message} onChange={handleInputChange} rows={5} placeholder="How can we help you today?" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 bg-slate-50/50 transition-all resize-none" />
                        </div>

                        <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-blue-950 text-white font-bold rounded-xl hover:bg-blue-900 transition-all text-sm disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Sending...</>
                          ) : (
                            'Send Message'
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </FadeLeft>
              </div>

              {/* Right Column: Contact Details (Spans 2 cols) */}
              <div className="lg:col-span-2">
                <FadeRight delay={100}>
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-full">
                    <h3 className="text-xl font-bold text-blue-950 mb-6">Contact Information</h3>
                    
                    <div className="space-y-8 flex-1">
                      <div className="flex gap-4 items-start">
                        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                          <PhoneIcon />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Call Us</p>
                          <a href="tel:+971505972959" className="block text-slate-700 font-medium hover:text-red-500 transition-colors">+971 50 597 2959</a>
                          <a href="tel:+971526419506" className="block text-slate-700 font-medium hover:text-red-500 transition-colors mt-1">+971 52 641 9506</a>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                          <MailIcon />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Us</p>
                          <a href="mailto:tahera@gmail.com" className="text-slate-700 font-medium hover:text-red-500 transition-colors">tahera@gmail.com</a>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                          <MapPinIcon />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Headquarters</p>
                          <p className="text-slate-700 font-medium leading-relaxed">Available across 8 premium locations in Dubai & RAK.<br/><Link href="/#restaurants" className="text-red-500 hover:underline text-sm font-bold mt-1 inline-block">View all branches ➔</Link></p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                          <ClockIcon />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Opening Hours</p>
                          <p className="text-slate-700 font-medium">Mon - Sun</p>
                          <p className="text-slate-500 text-sm mt-0.5">8:00 AM - 2:00 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeRight>
              </div>

            </div>
          </div>
        </section>

        {/* ── FOOTER (Reused) ── */}
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

export default function ContactPage() {
  return (
    <CartProvider>
      <ContactContent />
    </CartProvider>
  );
}