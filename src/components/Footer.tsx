import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BRAND_CONFIG } from '../data/vehicles';
import { useBooking } from '../context/BookingContext';

export function Footer() {
  const { openBooking } = useBooking();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#071D3A] text-white border-t border-white/10 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand Identity */}
          <div className="space-y-4">
            <Link to="/" className="inline-block bg-white rounded-xl p-2.5 shadow-sm">
              <img
                src={BRAND_CONFIG.logoPath}
                alt={BRAND_CONFIG.name}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <div>
              <h3 className="text-lg font-bold text-white">{BRAND_CONFIG.name}</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Self-drive car rentals all over Rourkela with flexible durations and negotiable pricing, plus upcoming self-drive bike rentals.
              </p>
              <div className="mt-2.5 flex flex-col gap-1">
                <span className="text-xs font-semibold text-[#F36B16]">
                  {BRAND_CONFIG.locationSummary}
                </span>
                <a
                  href={BRAND_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#F36B16]" />
                  <span>Google Maps Pinned Location</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Pages */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-200 hover:text-[#F36B16] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-200 hover:text-[#F36B16] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-slate-200 hover:text-[#F36B16] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-200 hover:text-[#F36B16] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="/#faq" className="text-slate-200 hover:text-[#F36B16] transition-colors">
                  FAQs &amp; Documents
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Rentals */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Rentals
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/cars" className="text-slate-200 hover:text-[#F36B16] transition-colors">
                  Self-Drive Cars
                </Link>
              </li>
              <li>
                <Link to="/bikes" className="text-slate-200 hover:text-[#F36B16] transition-colors">
                  Self-Drive Bikes (Coming Soon)
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="text-[#F36B16] hover:text-orange-400 font-semibold transition-colors cursor-pointer"
                >
                  Book Now
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Connect With Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={BRAND_CONFIG.phoneHref}
                  className="inline-flex items-center gap-2.5 text-slate-200 hover:text-[#F36B16] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#F36B16] shrink-0" aria-hidden="true" />
                  <span className="tabular-nums">{BRAND_CONFIG.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={BRAND_CONFIG.whatsappBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-slate-200 hover:text-[#F36B16] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" aria-hidden="true" />
                  <span>WhatsApp Booking</span>
                </a>
              </li>
              <li>
                <a
                  href={BRAND_CONFIG.emailHref}
                  className="inline-flex items-center gap-2.5 text-slate-200 hover:text-[#F36B16] transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#F36B16] shrink-0" aria-hidden="true" />
                  <span>{BRAND_CONFIG.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={BRAND_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-slate-200 hover:text-[#F36B16] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#F36B16] shrink-0" aria-hidden="true" />
                  <span>@{BRAND_CONFIG.instagramHandle}</span>
                </a>
              </li>
              <li>
                <a
                  href={BRAND_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-slate-200 hover:text-[#F36B16] transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#F36B16] shrink-0" aria-hidden="true" />
                  <span>View on Google Maps</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE GOOGLE MAP & LOCATION FOOTER CARD                  */}
        {/* ============================================================== */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 sm:p-6 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F36B16]/20 border border-[#F36B16]/40 text-[#F36B16] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white">
                      SATAPATHY TOURS AND TRAVELS
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Google Maps Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Self-Drive Pickup &amp; Doorstep Handover All Over Rourkela, Odisha
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={BRAND_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F36B16] hover:bg-[#d95b0e] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Google Map Embedded Iframe */}
            <div className="w-full h-56 sm:h-72 rounded-xl overflow-hidden border border-white/10 shadow-inner bg-[#0B2345]">
              <iframe
                src={BRAND_CONFIG.googleMapsEmbedUrl}
                title="SATAPATHY TOURS AND TRAVELS Google Map Location"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {currentYear} {BRAND_CONFIG.name}. All rights reserved.
          </p>
          <p>
            All listed rental prices are negotiable and subject to direct confirmation.
          </p>
        </div>
      </div>
    </footer>
  );
}
