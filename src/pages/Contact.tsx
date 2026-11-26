import React from 'react';
import { ExternalLink, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BRAND_CONFIG } from '../data/vehicles';
import { usePageMeta } from '../utils/seo';
import { ContactForm } from '../components/ContactForm';

export function Contact() {
  usePageMeta({
    title: 'Contact Us – Satapathy Tour and Travels (Rourkela)',
    description:
      'Get in touch with Satapathy Tour and Travels all over Rourkela via phone, WhatsApp, email (rklselfdrivecarz@gmail.com), or Instagram.',
  });

  return (
    <div>
      {/* SECTION 1 — CONTACT HERO */}
      <section className="bg-[#071D3A] text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-0.5 bg-[#F36B16]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#F36B16]">
                Reach Out · All Over Rourkela
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Get in Touch
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Have questions or planning your next journey in Rourkela? Contact Satapathy Tour and Travels via phone, WhatsApp, or email.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — CONTACT CARDS & FORM */}
      <section className="py-14 sm:py-20 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <a
              href={BRAND_CONFIG.phoneHref}
              className="bg-white rounded-2xl border border-[#E5EAF0] p-6 hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FFF3E9] text-[#F36B16] flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#697586]">
                  Phone
                </span>
                <span className="mt-1 block text-base font-bold text-[#071D3A] tabular-nums">
                  {BRAND_CONFIG.phoneDisplay}
                </span>
                <span className="mt-1 block text-xs font-semibold text-[#F36B16]">
                  Tap to call
                </span>
              </div>
            </a>

            <a
              href={BRAND_CONFIG.whatsappBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl border border-[#E5EAF0] p-6 hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#25D366] flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#697586]">
                  WhatsApp
                </span>
                <span className="mt-1 block text-base font-bold text-[#071D3A] tabular-nums">
                  {BRAND_CONFIG.phoneDisplay}
                </span>
                <span className="mt-1 block text-xs font-semibold text-[#25D366]">
                  Chat on WhatsApp
                </span>
              </div>
            </a>

            <a
              href={BRAND_CONFIG.emailHref}
              className="bg-white rounded-2xl border border-[#E5EAF0] p-6 hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FFF3E9] text-[#F36B16] flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#697586]">
                  Email
                </span>
                <span className="mt-1 block text-sm sm:text-base font-bold text-[#071D3A] break-all">
                  {BRAND_CONFIG.email}
                </span>
                <span className="mt-1 block text-xs font-semibold text-[#F36B16]">
                  Send an email
                </span>
              </div>
            </a>

            <a
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl border border-[#E5EAF0] p-6 hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FFF3E9] text-[#F36B16] flex items-center justify-center shrink-0">
                <Instagram className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#697586]">
                  Instagram
                </span>
                <span className="mt-1 block text-base font-bold text-[#071D3A] truncate">
                  @{BRAND_CONFIG.instagramHandle}
                </span>
                <span className="mt-1 block text-xs font-semibold text-[#F36B16]">
                  Follow on Instagram
                </span>
              </div>
            </a>
          </div>

          {/* SECTION 3 & 4 — CONTACT FORM + ROURKELA BUSINESS LOCATION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-[#E5EAF0] p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF3E9] text-[#F36B16] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#071D3A]">Business Location</h2>
                    <span className="text-xs font-semibold text-[#F36B16]">
                      Service Coverage Area
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-[#E5EAF0] bg-[#071D3A] text-white p-6">
                  <div className="flex items-center gap-2 text-[#F36B16] text-xs font-bold uppercase tracking-wider mb-2">
                    <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Rourkela, Odisha</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {BRAND_CONFIG.locationSummary}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                    {BRAND_CONFIG.locationDescription}
                  </p>
                </div>

                {/* Google Map Embedded Iframe */}
                <div className="mt-4 w-full h-52 rounded-xl overflow-hidden border border-[#E5EAF0] shadow-xs bg-[#071D3A]">
                  <iframe
                    src={BRAND_CONFIG.googleMapsEmbedUrl}
                    title="Satapathy Tours and Travels Google Map Location"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>

                <div className="mt-3">
                  <a
                    href={BRAND_CONFIG.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-[#071D3A] hover:bg-[#0B2345] text-white text-xs font-semibold transition-colors shadow-xs"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#F36B16]" />
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-slate-300" />
                  </a>
                </div>

                <div className="mt-6 pt-5 border-t border-[#E5EAF0] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-[#697586]">
                    Coordinate pickup anywhere in Rourkela
                  </span>
                  <div className="flex items-center gap-4">
                    <a
                      href={BRAND_CONFIG.emailHref}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#071D3A] hover:text-[#F36B16] whitespace-nowrap"
                    >
                      <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Email</span>
                    </a>
                    <a
                      href={BRAND_CONFIG.whatsappBaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#F36B16] hover:text-[#d95b0e] whitespace-nowrap"
                    >
                      <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>WhatsApp →</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
