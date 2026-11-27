import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bike, Car, CheckCircle2, Clock, Compass, MessageCircle, Quote, Sparkles, ShieldCheck } from 'lucide-react';
import { BRAND_CONFIG } from '../data/vehicles';
import { usePageMeta } from '../utils/seo';
import { useBooking } from '../context/BookingContext';
import { SectionHeading } from '../components/SectionHeading';
import { ResilientImage } from '../components/ResilientImage';

export function About() {
  usePageMeta({
    title: 'About Us | Satapathy Tour and Travels Rourkela',
    description:
      'Learn about Satapathy Tour and Travels in Rourkela, founded by Ayush Satapathy. Your trusted local partner for self-drive cars, bikes, chauffeur taxis, and Odisha tours.',
    canonical: '/about',
    ogType: 'website',
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

      {/* SECTION 3 — FOUNDER & CEO LEADERSHIP */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-[#FFF9F5] to-white border-t border-[#E5EAF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Leadership & Vision"
            title="Meet Our Founder & CEO"
            description="The entrepreneurial visionary driving self-drive convenience, transparency, and adventure across Rourkela and Odisha."
          />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LEFT COLUMN: FOUNDER PHOTOS SHOWCASE */}
            <div className="lg:col-span-5 space-y-4">
              {/* Primary Office Photo */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-white ring-1 ring-black/5 bg-[#071D3A] group">
                <div className="aspect-3/4 sm:aspect-3/4 lg:aspect-3/4 overflow-hidden">
                  <ResilientImage
                    src={BRAND_CONFIG.founder.officeImage}
                    alt={`${BRAND_CONFIG.founder.name} – ${BRAND_CONFIG.founder.title} of ${BRAND_CONFIG.name}`}
                    lazy={false}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                {/* Overlay gradient & identification badge */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#071D3A]/95 via-[#071D3A]/70 to-transparent text-white">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F36B16] text-white text-[11px] font-bold uppercase tracking-wider mb-2 shadow-sm">
                    <Sparkles className="w-3 h-3" />
                    <span>{BRAND_CONFIG.founder.title}</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight">
                    {BRAND_CONFIG.founder.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    {BRAND_CONFIG.name} · Rourkela, Odisha
                  </p>
                </div>
              </div>

              {/* Secondary Lifestyle / Adventure Photo */}
              <div className="relative rounded-2xl overflow-hidden border border-[#E5EAF0] bg-white shadow-xs p-3 flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                  <ResilientImage
                    src={BRAND_CONFIG.founder.tharImage}
                    alt={`${BRAND_CONFIG.founder.name} with Thar Roxx`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#F36B16]">
                    On The Road
                  </span>
                  <p className="text-sm font-semibold text-[#071D3A] line-clamp-1">
                    Passionate Adventurer & Car Enthusiast
                  </p>
                  <p className="text-xs text-[#697586] mt-0.5">
                    Inspiring memorable road trips across Odisha
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: PUNCH LINE & FOUNDER VISION */}
            <div className="lg:col-span-7 space-y-6">
              {/* THE PUNCH LINE CALLOUT BANNER */}
              <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#071D3A] to-[#0B2345] text-white shadow-xl overflow-hidden">
                <div
                  className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-[#F36B16]/20 blur-2xl pointer-events-none"
                  aria-hidden="true"
                />
                <Quote className="w-10 h-10 text-[#F36B16] mb-3 opacity-90" aria-hidden="true" />
                
                <p className="text-xs font-bold uppercase tracking-widest text-[#F36B16]">
                  Official Punchline
                </p>
                <blockquote className="mt-2 text-2xl sm:text-3xl font-extrabold text-white leading-snug tracking-tight">
                  &ldquo;{BRAND_CONFIG.founder.punchline}&rdquo;
                </blockquote>
                <p className="mt-2 text-sm sm:text-base font-semibold text-amber-200/90 italic">
                  &mdash; {BRAND_CONFIG.founder.punchlineHindi}
                </p>

                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <span className="block text-base font-bold text-white">
                      {BRAND_CONFIG.founder.name}
                    </span>
                    <span className="block text-xs text-slate-300">
                      {BRAND_CONFIG.founder.title}, {BRAND_CONFIG.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs text-slate-200 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Verified Founder</span>
                  </div>
                </div>
              </div>

              {/* FOUNDER'S STORY & MESSAGE */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5EAF0] shadow-xs space-y-4">
                <h4 className="text-xl font-bold text-[#071D3A]">
                  A Message from Ayush Satapathy
                </h4>
                <p className="text-sm sm:text-base text-[#697586] leading-relaxed">
                  &ldquo;When I founded Satapathy Tour and Travels in Rourkela, I wanted to change the way people rent and drive cars. Self-drive shouldn&rsquo;t be complicated by confusing agreements, hidden charges, or poor service. We built this business on one fundamental principle: total customer freedom.&rdquo;
                </p>
                <p className="text-sm sm:text-base text-[#697586] leading-relaxed">
                  &ldquo;Whether you need an SUV like the Scorpio for a rugged road trip, a sleek sedan like the Amaze or Dzire for family comfort, or an effortless Baleno Automatic for daily city drives, we give you the keys with complete peace of mind. Every client is a part of our extended family.&rdquo;
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={BRAND_CONFIG.whatsappBaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat with Ayush on WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => openBooking()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F36B16] hover:bg-[#d95b0e] text-white font-semibold text-sm transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Book Your Ride</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — OUR SERVICES */}
      <section className="py-16 sm:py-20 bg-[#F5F7FA] border-y border-[#E5EAF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Services"
            title="Self-Drive Rental Services"
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <h3 className="text-2xl font-bold text-[#071D3A]">Car Rental in Rourkela</h3>
                <p className="mt-3 text-sm sm:text-base text-[#697586] leading-relaxed">
                  Choose from Scorpio, Baleno Automatic, Honda Amaze, Swift Dzire, Fronx, and Swift with self-drive or driver-assisted options across Rourkela.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  to="/car-rental-rourkela"
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
                    Enquiries Open
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#071D3A]">Bike &amp; Scooter Rental</h3>
                <p className="mt-3 text-sm sm:text-base text-[#697586] leading-relaxed">
                  Upcoming two-wheeler rentals in Rourkela including Activa, Jupiter, Pulsar, and Royal Enfield. Inquire early on WhatsApp.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  to="/bike-rental-rourkela"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#071D3A] hover:text-[#F36B16]"
                >
                  <span>View Bike Updates</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5EAF0] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#071D3A]/5 text-[#071D3A] flex items-center justify-center">
                    <Compass className="w-6 h-6 text-[#F36B16]" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">
                    Custom Tours
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#071D3A]">Odisha Tour Packages</h3>
                <p className="mt-3 text-sm sm:text-base text-[#697586] leading-relaxed">
                  Tailored outstation travel packages from Rourkela to Khandadhar, Mandira Dam, Debrigarh Sanctuary, Similipal, and Puri Jagannath.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  to="/tour-packages"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#071D3A] hover:text-[#F36B16]"
                >
                  <span>Explore Tour Packages</span>
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
