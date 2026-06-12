import React from 'react';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 md:px-12 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
        <Link href="/" className="inline-flex items-center text-sm font-bold text-red-600 hover:text-red-700 mb-8 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-950 mb-4">Terms of Service</h1>
        <p className="text-sm text-slate-500 mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>

        <div className="space-y-6 text-sm md:text-base leading-relaxed text-slate-600">
          <p>
            Welcome to Tahera Restaurant. By accessing our website and placing orders, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.
          </p>

          <h2 className="text-xl font-bold text-blue-950 mt-8 mb-3">1. Online Ordering & Pricing</h2>
          <p>All menu prices are listed in UAE Dirhams (AED) and are inclusive of applicable VAT unless otherwise stated. We reserve the right to modify prices, delivery charges, and menu items without prior notice. Orders are subject to availability and branch operating hours.</p>

          <h2 className="text-xl font-bold text-blue-950 mt-8 mb-3">2. Delivery and Fulfillment</h2>
          <p>Estimated delivery times are provided as a guide and may vary due to traffic, weather, or operational constraints. We are not liable for delays outside of our control. It is your responsibility to ensure the delivery address and contact details provided are accurate.</p>

          <h2 className="text-xl font-bold text-blue-950 mt-8 mb-3">3. Cancellations & Refunds</h2>
          <p>Orders cannot be canceled once food preparation has begun. Refunds are handled on a case-by-case basis at the discretion of Tahera Restaurant management. If you receive an incorrect or unsatisfactory order, please contact our support team immediately.</p>

          <h2 className="text-xl font-bold text-blue-950 mt-8 mb-3">4. Intellectual Property</h2>
          <p>All content on this website, including logos, images, text, and graphics, is the property of Tahera Restaurant and is protected by UAE copyright laws. You may not reproduce, distribute, or use our content without written permission.</p>

          <h2 className="text-xl font-bold text-blue-950 mt-8 mb-3">5. Governing Law and Jurisdiction</h2>
          <p>These Terms of Service shall be governed by and construed in accordance with the federal laws of the United Arab Emirates and the local laws of the Emirate of Dubai. Any disputes arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the courts of Dubai.</p>
        </div>
      </div>
    </div>
  );
}