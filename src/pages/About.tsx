import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bike, Car, CheckCircle2, Clock, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../data/vehicles';
import { usePageMeta } from '../utils/seo';
import { useBooking } from '../context/BookingContext';
import { SectionHeading } from '../components/SectionHeading';
import { ResilientImage } from '../components/ResilientImage';

export function About() {
  usePageMeta({
    title: 'About Us – Satapathy Tour and Travels',
    description:
      'Learn about Satapathy Tour and Travels — convenient self-drive car rental enquiries with transparent, negotiable pricing and direct WhatsApp booking.',
  });

  const { openBooking } = useBooking();

  return (
    <div>
      {/* SECTION 1 — ABOUT HERO */}
      <section className="relative bg-[#071D3A] overflow-hidden">
        <div className="absolute inset-0">
          <ResilientImage
            src={BRAND_CONFIG.aboutImage}
            alt="Satapathy Tour and Travels self-drive journey"
            lazy={false}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#071D3A]/95 via-[#071D3A]/85 to-[#071D3A]/55"
            aria-hidden="true"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-0.5 bg-[#F36B16]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#F36B16]">
                Who We Are
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              About Satapathy Tour and Travels
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
              Your destination for convenient self-drive car rental enquiries.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — OUR BUSINESS */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Our Business"
                title="Built Around Self-Drive Convenience"
              />
              <p className="mt-5 text-base text-[#697586] leading-relaxed">
                Satapathy Tour and Travels provides self-drive car rental options all over Rourkela for travellers looking for flexibility and ease, and is actively preparing to launch self-drive bike rental services.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  'Convenient vehicle selection across four popular car models',
                  'Flexible 12-hour and 24-hour rental durations',
                  'Transparent displayed package pricing',
                  'Negotiable rental rates discussed directly with our team',
                  'Easy WhatsApp booking enquiries with structured trip details',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm sm:text-base text-[#172337]">
                    <CheckCircle2 className="w-5 h-5 text-[#F36B16] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#F5F7FA] rounded-2xl border border-[#E5EAF0] p-8 flex flex-col items-center text-center">
                <div className="bg-white rounded-2xl p-5 border border-[#E5EAF0] shadow-xs">
                  <img
                    src={BRAND_CONFIG.logoPath}
                    alt={BRAND_CONFIG.name}
                    className="h-28 w-auto object-contain"
                  />
                </div>
                <h3 className="mt-6 text-xl font-bold text-[#071D3A]">
                  {BRAND_CONFIG.name}
                </h3>
                <p className="mt-1 text-xs font-bold tracking-widest uppercase text-[#F36B16]">
                  {BRAND_CONFIG.tagline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — OUR SERVICES */}
      <section className="py-16 sm:py-20 bg-[#F5F7FA] border-y border-[#E5EAF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Services"
            title="Self-Drive Rental Services"
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-[#E5EAF0] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FFF3E9] text-[#F36B16] flex items-center justify-center">
                    <Car className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">
                    Available
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#071D3A]">Self-Drive Cars</h3>
                <p className="mt-3 text-sm sm:text-base text-[#697586] leading-relaxed">
                  Choose from Scorpio, Baleno Automatic, Honda Amaze, Swift Dzire, Baleno, Fronx, and Swift with 12-hour and 24-hour package options and negotiable rates.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  to="/cars"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#F36B16] hover:text-[#d95b0e]"
                >
                  <span>Browse Cars</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5EAF0] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F5F7FA] text-[#071D3A] flex items-center justify-center">
                    <Bike className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-semibold text-[#F36B16] bg-[#FFF3E9] px-3 py-1 rounded-lg">
                    Coming Soon
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#071D3A]">Self-Drive Bikes</h3>
                <p className="mt-3 text-sm sm:text-base text-[#697586] leading-relaxed">
                  Our self-drive bike rental service is currently in preparation and has not launched yet. You can reach out via WhatsApp to share your interest.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  to="/bikes"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#071D3A] hover:text-[#F36B16]"
                >
                  <span>View Bike Updates</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — OUR APPROACH */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Approach"
            title="Focused on Simplicity & Clarity"
          />

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MessageCircle,
                title: 'Easy Enquiries',
                desc: 'Send complete vehicle and schedule details directly on WhatsApp without complicated paperwork.',
              },
              {
                icon: CheckCircle2,
                title: 'Clear Pricing',
                desc: 'Every available car lists its 12-hour and 24-hour base rate upfront, with open negotiation.',
              },
              {
                icon: Car,
                title: 'Vehicle Choices',
                desc: 'Pick between compact sedan, crossover, and hatchback options suited to your trip.',
              },
              {
                icon: Clock,
                title: 'Customer Convenience',
                desc: 'Quick direct communication over phone and WhatsApp to confirm your travel plan.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-[#F5F7FA] border border-[#E5EAF0]"
                >
                  <Icon className="w-6 h-6 text-[#F36B16] mb-4" aria-hidden="true" />
                  <h3 className="text-lg font-bold text-[#071D3A]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#697586] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5 — CTA */}
      <section className="py-16 bg-[#071D3A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Planning Your Next Journey?
            </h2>
            <p className="mt-2 text-slate-300 text-base">
              Choose your car and send your booking enquiry directly on WhatsApp.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openBooking()}
            className="px-7 py-3.5 rounded-xl bg-[#F36B16] hover:bg-[#d95b0e] text-white font-semibold text-sm sm:text-base transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Book Your Ride
          </button>
        </div>
      </section>
    </div>
  );
}
