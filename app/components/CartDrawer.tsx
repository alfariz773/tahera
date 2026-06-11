'use client';

import React from 'react';
import { useCart } from '../context/CartContext';

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (!isCartOpen) return null;

  // WhatsApp Checkout Logic
  const handleWhatsAppCheckout = () => {
    const restaurantPhone = "971505972959"; // Tahera Restaurant Number
    let message = "Hello Tahera Restaurant! I would like to place an order for delivery:%0A%0A";
    
    cart.forEach(item => {
      message += `▪ ${item.quantity}x ${item.name} (AED ${item.price * item.quantity})%0A`;
    });
    
    message += `%0A*Total: AED ${cartTotal}*`;
    
    // Open WhatsApp
    window.open(`https://wa.me/${restaurantPhone}?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Background Dark Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-out Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-[70] flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Your Order</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
            <CloseIcon />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <p>Your cart is empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="mt-4 text-red-500 font-bold hover:underline"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center gap-4">
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">{item.name}</h4>
                  <p className="text-red-500 font-bold text-sm mt-1">AED {item.price * item.quantity}</p>
                </div>
                
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-100">
                  <button onClick={() => updateQuantity(item.name, -1)} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-red-500 font-bold">-</button>
                  <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.name, 1)} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-red-500 font-bold">+</button>
                </div>

                <button onClick={() => removeFromCart(item.name)} className="text-gray-400 hover:text-red-500 p-2">
                  <TrashIcon />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout Button */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-5">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="font-extrabold text-gray-900 text-xl">AED {cartTotal}</span>
            </div>
            <button 
              onClick={handleWhatsAppCheckout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.88 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Order via WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}