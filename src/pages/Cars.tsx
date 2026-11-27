import React, { useEffect, useState } from 'react';
import {
  BadgeIndianRupee,
  CheckCircle2,
  ChevronDown,
  Clock,
  Compass,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  UserCheck,
  Zap,
} from 'lucide-react';
import { BRAND_CONFIG, CAR_MODELS, SERVICE_AREAS_ROURKELA, type CarModel } from '../data/vehicles';
import { usePageMeta } from '../utils/seo';
import { buildTaxiWhatsAppUrl, triggerExternalWhatsApp } from '../utils/whatsapp';
import { VehicleCard } from '../components/VehicleCard';
import { VehicleDetailModal } from '../components/VehicleDetailModal';
import { ResilientImage } from '../components/ResilientImage';
import { useBooking } from '../context/BookingContext';
import { SectionHeading } from '../components/SectionHeading';

const CAR_RENTAL_FAQS = [
  {
    q: 'What is the procedure for self-drive car rental in Rourkela?',
    a: 'Booking a self-drive car with Satapathy Tour and Travel is simple: 1) Choose your car (Scorpio, Baleno, Amaze, Dzire, Fronx, or Swift). 2) Select your 12-hour, 24-hour, or multi-day rental schedule. 3) Share your Driving Licence and Aadhaar Card on WhatsApp. 4) Pay a small advance token to lock your slot. We handover the keys right at your location in Rourkela!',
  },
  {
    q: 'Do you offer car rental with driver / outstation taxi services from Rourkela?',
    a: 'Yes! In addition to self-drive cars, we provide chauffeur-driven car rentals and outstation taxi services from Rourkela to Jharsuguda Airport, Sambalpur, Bhubaneswar, Ranchi, Cuttack, Puri, and all surrounding areas. Our local drivers are courteous, experienced, and well-versed in highway routes.',
  },
  {
    q: 'Can I take the self-drive car outside Rourkela for outstation road trips?',
    a: 'Absolutely. You can drive our self-drive rental cars anywhere in Odisha, Jharkhand, Chhattisgarh, and neighboring states. Just inform us of your destination so we can arrange suitable duration packages with complete vehicle documentation.',
  },
  {
    q: 'Are car rental prices negotiable in Rourkela?',
    a: 'Yes, all our listed prices (e.g. ₹1,200/12h for Swift up to ₹2,500/12h for Scorpio) are transparent base rates and open for friendly negotiation, especially for multi-day rentals, weekly bookings, and corporate packages.',
  },
  {
    q: 'Where can I pick up the rental car in Rourkela?',
    a: 'We offer doorstep delivery and pickup all over Rourkela, including Rourkela Railway Station, Civil Township, Koel Nagar, Chhend Colony, Panposh, Uditnagar, and Sectors 1 to 21.',
  },
];

export function Cars() {
  const [detailCar, setDetailCar] = useState<CarModel | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const { openBooking, triggerCarAnimation, introFinished } = useBooking();

  // Structured Data for Car Rental Service
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    name: `${BRAND_CONFIG.name} - Car Rental Rourkela`,
    url: `${BRAND_CONFIG.websiteUrl}/car-rental-rourkela`,
    telephone: BRAND_CONFIG.phoneDisplay,
    priceRange: '₹1,200 - ₹3,200',
    areaServed: {
      '@type': 'City',
      name: 'Rourkela',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rourkela',
      addressRegion: 'Odisha',
      addressCountry: 'IN',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Car Rental Fleet in Rourkela',
      itemListElement: CAR_MODELS.map((car) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Car',
          name: car.name,
          description: car.shortNote,
        },
        priceSpecification: [
          {
            '@type': 'UnitPriceSpecification',
            price: car.price12h,
            priceCurrency: 'INR',
            unitText: '12 Hours',
          },
          {
            '@type': 'UnitPriceSpecification',
            price: car.price24h,
            priceCurrency: 'INR',
            unitText: '24 Hours',
          },
        ],
      })),
    },
  };

  usePageMeta({
    title: 'Car Rental in Rourkela – Self-Drive & With-Driver Cars | Satapathy Travels',
    description:
      'Best car rental in Rourkela with self-drive & driver options. Rent Scorpio, Baleno Automatic, Amaze, Swift Dzire & Fronx from ₹1,200. Negotiable rates & instant WhatsApp booking.',
    canonical: '/car-rental-rourkela',
    structuredData,
  });

  // Play the 2-second car animation whenever arriving on the Cars page
  useEffect(() => {
    if (introFinished) {
      triggerCarAnimation();
    }
  }, [introFinished, triggerCarAnimation]);

  const handleDriverTaxiEnquiry = (type: string) => {
    const url = buildTaxiWhatsAppUrl(type, 'Rourkela', 'Outstation / Local');
    triggerExternalWhatsApp(url);
  };

  return (
    <div>
      {/* SECTION 1 — PAGE HERO */}
      <section className="relative bg-[#071D3A] overflow-hidden">
        <div className="absolute inset-0">
          <ResilientImage
            src={BRAND_CONFIG.aboutImage}
            alt="Car rental and self-drive cars in Rourkela"
            lazy={false}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#071D3A]/95 via-[#071D3A]/85 to-[#071D3A]/55"
            aria-hidden="true"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-0.5 bg-[#F36B16]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#F36B16]">
                Car Rental Services in Rourkela
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance">
              Car Rental in Rourkela – Self-Drive &amp; Chauffeur-Driven Cars
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
              Rent premium, well-maintained self-drive cars or hire comfortable cars with driver in
              Rourkela. Choose from Mahindra Scorpio SUV, Baleno Automatic, Honda Amaze, Swift
              Dzire, Fronx, and Swift with flexible 12h, 24h, and outstation packages.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => openBooking({ vehicleType: 'Car' })}
                className="px-6 py-3.5 rounded-xl bg-[#F36B16] hover:bg-[#d95b0e] text-white font-semibold text-sm sm:text-base transition-colors shadow-md cursor-pointer"
              >
                Book a Self-Drive Car
              </button>

              <button
                type="button"
                onClick={() => triggerCarAnimation()}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                title="Click to watch the 2s car animation again"
              >
                <Zap className="w-3.5 h-3.5 text-[#F36B16]" />
                <span>Play 2s Car Animation</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING NOTICE & WHATSAPP STRIP */}
      <section className="bg-[#FFF3E9] border-b border-[#F36B16]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BadgeIndianRupee className="w-5 h-5 text-[#F36B16] shrink-0" aria-hidden="true" />
            <p className="text-sm font-semibold text-[#071D3A]">
              {BRAND_CONFIG.negotiableNotice} All vehicles are sanitised and serviced.
            </p>
          </div>
          <a
            href={BRAND_CONFIG.whatsappBaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F36B16] hover:text-[#d95b0e] whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Discuss Car Rental on WhatsApp</span>
          </a>
        </div>
      </section>

      {/* SECTION 2 — VEHICLE FLEET LISTING */}
      <section className="py-14 sm:py-20 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Available Fleet"
            title="Self-Drive Car Rental Fleet in Rourkela"
            description="All rates are negotiable. Transparent 12-hour and 24-hour packages with doorstep handover in Rourkela."
          />

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAR_MODELS.map((car) => (
              <VehicleCard
                key={car.id}
                car={car}
                ctaLabel="Book This Car"
                onViewDetails={(selected) => setDetailCar(selected)}
              />
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-white border border-[#E5EAF0] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
            <div>
              <h2 className="text-xl font-bold text-[#071D3A]">
                Need multi-day rentals, weekly hire, or a custom route?
              </h2>
              <p className="mt-1.5 text-sm text-[#697586]">
                We offer custom negotiable rental quotes for outstation road trips, wedding events, and corporate travel across Odisha.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openBooking({ vehicleType: 'Car' })}
              className="px-6 py-3 rounded-xl bg-[#F36B16] hover:bg-[#d95b0e] text-white font-semibold text-sm whitespace-nowrap shrink-0 cursor-pointer transition-colors"
            >
              Book Your Ride
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3 — CAR RENTAL WITH DRIVER & OUTSTATION TAXI */}
      <section className="py-16 sm:py-20 bg-white border-y border-[#E5EAF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2.5 mb-3">
                <UserCheck className="w-5 h-5 text-[#F36B16]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#F36B16]">
                  Chauffeur-Driven Travel
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#071D3A] tracking-tight">
                Car Rental With Driver &amp; Outstation Taxi in Rourkela
              </h2>
              <p className="mt-4 text-base text-[#697586] leading-relaxed">
                Prefer to sit back and relax? Hire our professional car rental with driver service. Perfect for outstation family trips, business delegates, and railway station or airport transfers across Odisha.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F5F7FA] border border-[#E5EAF0]">
                  <h4 className="text-sm font-bold text-[#071D3A] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Outstation Cab from Rourkela</span>
                  </h4>
                  <p className="mt-1 text-xs text-[#697586]">
                    Travel to Jharsuguda, Sambalpur, Bhubaneswar, Ranchi, Cuttack &amp; Puri with polite, route-expert drivers.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F5F7FA] border border-[#E5EAF0]">
                  <h4 className="text-sm font-bold text-[#071D3A] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Local City Taxi &amp; Station Transfers</span>
                  </h4>
                  <p className="mt-1 text-xs text-[#697586]">
                    Prompt doorstep pickup &amp; drop to Rourkela Railway Station, Steel Plant, and business meetings.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleDriverTaxiEnquiry('Outstation Cab with Driver')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire for Cab on WhatsApp</span>
                </button>
                <a
                  href={BRAND_CONFIG.phoneHref}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#071D3A] hover:bg-[#0B2345] text-white font-semibold text-sm shadow-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#F36B16]" />
                  <span>Call {BRAND_CONFIG.phoneDisplay}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#071D3A] text-white shadow-xl">
                <h3 className="text-xl font-bold text-white mb-2">
                  Doorstep Delivery Across Rourkela
                </h3>
                <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                  We handover your rental vehicle at any location in Rourkela city and suburbs:
                </p>

                <div className="flex flex-wrap gap-2">
                  {SERVICE_AREAS_ROURKELA.slice(0, 8).map((area) => (
                    <span
                      key={area}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-xs text-slate-200 border border-white/10"
                    >
                      <MapPin className="w-3 h-3 text-[#F36B16]" />
                      <span>{area}</span>
                    </span>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span>Fast 2-Min Digital Verification</span>
                  <span className="text-[#F36B16] font-bold">100% Transparent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — LOCAL CAR RENTAL FAQS */}
      <section className="py-16 sm:py-20 bg-[#F5F7FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Rourkela Car Rental FAQs"
            title="Questions About Hiring Cars in Rourkela"
            description="Everything you need to know about self-drive policies, security deposits, and driver options."
          />

          <div className="mt-10 space-y-3.5">
            {CAR_RENTAL_FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-[#E5EAF0] bg-white overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F5F7FA]/60"
                  >
                    <span className="text-base font-bold text-[#071D3A]">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#F36B16] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-[#697586] leading-relaxed border-t border-[#E5EAF0]/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <VehicleDetailModal car={detailCar} onClose={() => setDetailCar(null)} />
    </div>
  );
}
