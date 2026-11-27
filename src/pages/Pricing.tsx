import React from 'react';
import { BadgeIndianRupee, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG, CAR_MODELS } from '../data/vehicles';
import { usePageMeta } from '../utils/seo';
import { PricingCard } from '../components/PricingCard';
import { PricingTable } from '../components/PricingTable';
import { SectionHeading } from '../components/SectionHeading';
import { useBooking } from '../context/BookingContext';

export function Pricing() {
  usePageMeta({
    title: 'Rental Pricing & Rates | Satapathy Tour and Travels Rourkela',
    description:
      'Transparent 12-hour and 24-hour self-drive car rental rates in Rourkela for Scorpio, Fronx, Swift, Baleno & Dzire. Negotiable rates and zero hidden charges.',
    canonical: '/pricing',
    ogType: 'website',
  });

  const { openBooking } = useBooking();

  return (
    <div>
      {/* SECTION 1 — PRICING HERO */}
      <section className="bg-[#071D3A] text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-0.5 bg-[#F36B16]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#F36B16]">
                Package Rates
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              Simple and Transparent Rental Pricing
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Explore our available self-drive car rental packages.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — PRICING CARDS */}
      <section className="py-14 sm:py-20 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Car Packages"
            title="12-Hour & 24-Hour Rates"
            description="Every vehicle displays clear base package rates. Prices are negotiable on direct enquiry."
          />

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAR_MODELS.map((car) => (
              <PricingCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — COMPARISON TABLE */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Compare Options"
            title="Package Comparison Table"
          />

          <div className="mt-8">
            <PricingTable />
          </div>

          {/* SECTION 4 — PRICING INFORMATION */}
          <div className="mt-10 rounded-2xl bg-[#FFF3E9] border border-[#F36B16]/30 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#F36B16] text-white flex items-center justify-center shrink-0">
                <BadgeIndianRupee className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#071D3A]">
                  Negotiable Rental Pricing
                </h2>
                <p className="mt-1 text-sm sm:text-base text-[#172337] leading-relaxed">
                  All prices are negotiable. Contact us directly to discuss your rental requirements and confirm the final price.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => openBooking()}
                className="px-5 py-3 rounded-xl bg-[#F36B16] hover:bg-[#d95b0e] text-white font-semibold text-sm transition-colors cursor-pointer"
              >
                Book Now
              </button>
              <a
                href={BRAND_CONFIG.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#071D3A] hover:bg-[#0B2345] text-white font-semibold text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
