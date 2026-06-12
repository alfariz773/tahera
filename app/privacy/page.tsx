import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
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

        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-950 mb-4">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>

        <div className="space-y-6 text-sm md:text-base leading-relaxed text-slate-600">
          <p>
            Tahera Restaurant ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services, in compliance with the UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPL).
          </p>

          <h2 className="text-xl font-bold text-blue-950 mt-8 mb-3">1. Information We Collect</h2>
          <p>We may collect personal identification information (Name, Email address, Phone number, Delivery address) when you place an order, subscribe to our newsletter, or fill out a form. We also collect non-personal identification information such as browser type, device information, and IP addresses automatically when you interact with our site.</p>

          <h2 className="text-xl font-bold text-blue-950 mt-8 mb-3">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To process and deliver your restaurant orders.</li>
            <li>To improve our website functionality and customer service.</li>
            <li>To send periodic promotional emails or WhatsApp updates (only if you have opted in).</li>
            <li>To comply with UAE legal and regulatory requirements.</li>
          </ul>

          <h2 className="text-xl font-bold text-blue-950 mt-8 mb-3">3. Data Security and Retention</h2>
          <p>We implement robust security measures to maintain the safety of your personal data. Your data is stored securely and is only retained for as long as necessary to fulfill the purposes outlined in this policy or as required by UAE law (typically 5 years for transaction records).</p>

          <h2 className="text-xl font-bold text-blue-950 mt-8 mb-3">4. Your Rights</h2>
          <p>Under the UAE PDPL, you have the right to access, update, or request the deletion of your personal data. You may also withdraw your consent for marketing communications at any time by contacting us.</p>

          <h2 className="text-xl font-bold text-blue-950 mt-8 mb-3">5. Contact Us</h2>
          <p>If you have questions regarding this privacy policy, you may contact us at:</p>
          <p className="font-semibold mt-2">Email: tahera@gmail.com</p>
          <p className="font-semibold">Phone: +971 50 597 2959</p>
          <p className="font-semibold">Address: Dubai, United Arab Emirates</p>
        </div>
      </div>
    </div>
  );
}