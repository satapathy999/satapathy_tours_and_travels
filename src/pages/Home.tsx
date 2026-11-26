import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeIndianRupee,
  Calendar,
  Car,
  Clock,
  Compass,
  FileText,
  Key,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import {
  BRAND_CONFIG,
  CAR_MODELS,
  RENTAL_DURATIONS,
  type RentalDuration,
  type VehicleType,
} from '../data/vehicles';
import { useBooking } from '../context/BookingContext';
import { getTodayDateString } from '../utils/validation';
import { usePageMeta } from '../utils/seo';
import { SectionHeading } from '../components/SectionHeading';
import { VehicleCard } from '../components/VehicleCard';
import { ResilientImage } from '../components/ResilientImage';
import { DocumentChecklist } from '../components/DocumentChecklist';
import { FAQSection } from '../components/FAQSection';

export function Home() {
  usePageMeta({
    title: 'Satapathy Tour and Travels – Self-Drive Car & Bike Rentals in Rourkela',
    description:
      'Explore more with convenient self-drive car rentals all over Rourkela from Satapathy Tour and Travels. Transparent negotiable packages for Scorpio, Baleno Automatic, Honda Amaze, Swift Dzire, Baleno, Fronx, and Swift.',
  });

  const { openBooking, triggerCarAnimation } = useBooking();
  const today = useMemo(() => getTodayDateString(), []);

  // Quick booking strip state
  const [quickType, setQuickType] = useState<VehicleType>('Car');
  const [quickCarId, setQuickCarId] = useState<string>(CAR_MODELS[0].id);
  const [quickDuration, setQuickDuration] = useState<RentalDuration>('12 Hours');
  const [quickDate, setQuickDate] = useState<string>(today);

  const handleQuickBook = (event: React.FormEvent) => {
    event.preventDefault();
    openBooking({
      vehicleType: quickType,
      vehicleId: quickType === 'Car' ? quickCarId : undefined,
      duration: quickDuration,
      pickupDate: quickDate >= today ? quickDate : today,
    });
  };

  return (
    <div>
      {/* SECTION 1 — HERO */}
      <section className="relative bg-[#071D3A] overflow-hidden">
        <div className="absolute inset-0">
          <ResilientImage
            src={BRAND_CONFIG.heroImage}
            alt="Self-drive rental car overlooking an open twilight highway"
            lazy={false}
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#071D3A]/95 via-[#071D3A]/80 to-[#071D3A]/35"
            aria-hidden="true"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-0.5 bg-[#F36B16] inline-block" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#F36B16]">
                SATAPATHY TOUR AND TRAVELS
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white tracking-tight leading-[1.1] text-balance">
              Your Journey. Your Drive. Your Freedom.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
              Explore more with convenient self-drive car rentals all over Rourkela. Choose your vehicle, plan your journey, and experience the freedom of driving on your own terms.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                to="/cars"
                onClick={() => triggerCarAnimation()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#F36B16] hover:bg-[#d95b0e] text-white font-semibold text-sm sm:text-base shadow-sm transition-colors whitespace-nowrap"
              >
                <span>Explore Cars</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </Link>

              <Link
                to="/bikes"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm sm:text-base transition-colors whitespace-nowrap"
              >
                Explore Bikes
              </Link>

              <button
                type="button"
                onClick={() => openBooking()}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white hover:bg-[#F5F7FA] text-[#071D3A] font-semibold text-sm sm:text-base transition-colors whitespace-nowrap cursor-pointer"
              >
                Book Your Ride
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F36B16]" aria-hidden="true" />
                <span>All Over Rourkela</span>
              </span>
              <span aria-hidden="true" className="text-[#F36B16]">·</span>
              <span>Negotiable Package Rates</span>
              <span aria-hidden="true" className="text-[#F36B16]">·</span>
              <span>Direct WhatsApp Booking</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — QUICK BOOKING STRIP */}
      <section aria-label="Quick booking bar" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10">
        <form
          onSubmit={handleQuickBook}
          className="bg-white rounded-2xl border border-[#E5EAF0] shadow-lg p-4 sm:p-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div>
              <label htmlFor="quick-type" className="block text-xs font-semibold uppercase tracking-wider text-[#697586] mb-1.5">
                Vehicle Type
              </label>
              <select
                id="quick-type"
                value={quickType}
                onChange={(e) => setQuickType(e.target.value as VehicleType)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF0] bg-[#F5F7FA] text-sm font-medium text-[#172337] focus:outline-none focus:border-[#F36B16] focus:bg-white"
              >
                <option value="Car">Car (Available)</option>
                <option value="Bike">Bike (Coming Soon)</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label htmlFor="quick-model" className="block text-xs font-semibold uppercase tracking-wider text-[#697586] mb-1.5">
                Select Model
              </label>
              {quickType === 'Car' ? (
                <select
                  id="quick-model"
                  value={quickCarId}
                  onChange={(e) => setQuickCarId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF0] bg-[#F5F7FA] text-sm font-medium text-[#172337] focus:outline-none focus:border-[#F36B16] focus:bg-white"
                >
                  {CAR_MODELS.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.name}
                    </option>
                  ))}
                  <option value="others">Others</option>
                </select>
              ) : quickType === 'Bike' ? (
                <input
                  id="quick-model"
                  type="text"
                  readOnly
                  value="Bike Service Enquiry"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF0] bg-[#F5F7FA] text-sm text-[#697586]"
                />
              ) : (
                <input
                  id="quick-model"
                  type="text"
                  readOnly
                  value="Others (Custom Enquiry)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF0] bg-[#F5F7FA] text-sm text-[#697586]"
                />
              )}
            </div>

            <div>
              <label htmlFor="quick-duration" className="block text-xs font-semibold uppercase tracking-wider text-[#697586] mb-1.5">
                Rental Duration
              </label>
              <select
                id="quick-duration"
                value={quickDuration}
                onChange={(e) => setQuickDuration(e.target.value as RentalDuration)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF0] bg-[#F5F7FA] text-sm font-medium text-[#172337] focus:outline-none focus:border-[#F36B16] focus:bg-white"
              >
                {RENTAL_DURATIONS.map((dur) => (
                  <option key={dur} value={dur}>
                    {dur}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="quick-date" className="block text-xs font-semibold uppercase tracking-wider text-[#697586] mb-1.5">
                Pickup Date
              </label>
              <input
                id="quick-date"
                type="date"
                min={today}
                value={quickDate}
                onChange={(e) => setQuickDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF0] bg-[#F5F7FA] text-sm font-medium text-[#172337] focus:outline-none focus:border-[#F36B16] focus:bg-white"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-5 rounded-xl bg-[#F36B16] hover:bg-[#d95b0e] text-white font-semibold text-sm transition-colors whitespace-nowrap cursor-pointer h-[42px]"
              >
                Book Now
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* SECTION 3 — CHOOSE YOUR RIDE */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Vehicle Categories"
            title="Choose Your Perfect Ride"
            description="Find the right vehicle for your next journey across Rourkela and beyond."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Cars Category Card */}
            <article className="group bg-white rounded-2xl border border-[#E5EAF0] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-lg">
              <div>
                <div className="aspect-16/10 bg-[#F5F7FA] overflow-hidden">
                  <ResilientImage
                    src={CAR_MODELS[2].image}
                    alt="Self-drive cars available at Satapathy Tour and Travels"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-2xl font-bold text-[#071D3A]">Self-Drive Cars</h3>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg whitespace-nowrap">
                      Available
                    </span>
                  </div>
                  <p className="mt-3 text-base text-[#697586] leading-relaxed">
                    Choose from our available cars and enjoy the freedom of travelling at your own pace.
                  </p>
                </div>
              </div>
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <Link
                  to="/cars"
                  onClick={() => triggerCarAnimation()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#071D3A] hover:bg-[#0B2345] text-white font-semibold text-sm transition-colors"
                >
                  <span>Explore Cars</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </article>

            {/* Bikes Category Card */}
            <article className="group bg-white rounded-2xl border border-[#E5EAF0] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-lg">
              <div>
                <div className="aspect-16/10 bg-[#071D3A] overflow-hidden">
                  <ResilientImage
                    src={BRAND_CONFIG.bikeHeroImage}
                    alt="Upcoming self-drive motorcycle rentals"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-2xl font-bold text-[#071D3A]">Self-Drive Bikes</h3>
                    <span className="text-xs font-semibold text-[#F36B16] bg-[#FFF3E9] px-3 py-1 rounded-lg whitespace-nowrap">
                      Coming Soon
                    </span>
                  </div>
                  <p className="mt-3 text-base text-[#697586] leading-relaxed">
                    Two-wheel adventures are coming soon.
                  </p>
                </div>
              </div>
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <Link
                  to="/bikes"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#E5EAF0] hover:bg-[#F5F7FA] text-[#071D3A] font-semibold text-sm transition-colors"
                >
                  <span>Explore Bikes</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* SECTION 4 — FEATURED VEHICLES */}
      <section className="py-16 sm:py-20 bg-[#F5F7FA] border-y border-[#E5EAF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Available Fleet"
              title="Our Available Cars"
              description="All listed prices are negotiable. Contact us directly for your best rental package."
            />
            <Link
              to="/cars"
              onClick={() => triggerCarAnimation()}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F36B16] hover:text-[#d95b0e] whitespace-nowrap shrink-0"
            >
              <span>View All Cars</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAR_MODELS.map((car) => (
              <VehicleCard key={car.id} car={car} ctaLabel="Book Now" />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHY CHOOSE US */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Commitment"
            title="Why Choose Satapathy Tour and Travels?"
          />

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                title: 'Flexible Rental Options',
                desc: 'Choose from 12 hours, 24 hours, 48 hours, 5 days, 1 week, 1 month, or custom durations.',
              },
              {
                icon: BadgeIndianRupee,
                title: 'Affordable Pricing',
                desc: 'Transparent displayed package prices with negotiable rental rates on enquiry.',
              },
              {
                icon: MessageCircle,
                title: 'Easy Booking',
                desc: 'Submit your booking enquiry directly through WhatsApp in just a few steps.',
              },
              {
                icon: Compass,
                title: 'Freedom to Explore',
                desc: 'Enjoy self-drive travel with service available all over Rourkela.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-[#F5F7FA] border border-[#E5EAF0] flex flex-col"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-[#E5EAF0] text-[#F36B16] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-[#071D3A]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#697586] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6 — HOW BOOKING WORKS */}
      <section className="py-16 sm:py-20 bg-[#F5F7FA] border-y border-[#E5EAF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Simple 4-Step Process"
            title="How Booking Works"
            description="From booking form to doorstep car handover at your location in 4 quick steps."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                icon: FileText,
                title: 'Fill Up the Form',
                desc: 'Select your preferred cars (Scorpio, Baleno, Amaze, Dzire, Fronx, Swift), choose your rental duration (12h, 24h, weekly), and enter your travel dates.',
              },
              {
                step: '02',
                icon: BadgeIndianRupee,
                title: 'Pay Advance Token',
                desc: 'Pay a nominal advance token via UPI (GPay, PhonePe, Paytm) to lock and reserve your vehicle slot exclusively.',
              },
              {
                step: '03',
                icon: ShieldCheck,
                title: 'Verify Documents',
                desc: 'Share clear photos of your Driving Licence & Aadhaar Card on WhatsApp for fast 2-minute digital verification.',
              },
              {
                step: '04',
                icon: Key,
                title: 'Doorstep Handover',
                desc: 'We deliver and handover the sanitized car with keys right at your location anywhere in Rourkela!',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative bg-white rounded-2xl border border-[#E5EAF0] hover:border-[#F36B16]/50 p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block text-xs font-black tracking-wider text-[#F36B16]">
                        STEP {item.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#FFF3E9] text-[#F36B16] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-[#071D3A]">{item.title}</h3>
                    <p className="mt-2 text-sm text-[#697586] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DOCUMENT CHECKLIST SECTION */}
      <DocumentChecklist />

      {/* SECTION 7 — ABOUT PREVIEW */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="aspect-16/10 rounded-2xl overflow-hidden border border-[#E5EAF0] bg-[#F5F7FA]">
              <ResilientImage
                src={BRAND_CONFIG.aboutImage}
                alt="Touring car driving along a scenic coastal road"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <SectionHeading
                eyebrow="About Us · All Over Rourkela"
                title="Drive Your Way with Satapathy Tour and Travels"
                description="Satapathy Tour and Travels provides straightforward self-drive car rental enquiries all over Rourkela with transparent package rates and direct communication."
              />
              <p className="mt-4 text-base text-[#697586] leading-relaxed">
                Whether you need a car for 12 hours, 24 hours, a weekend, a week, or a full month, you can browse our available vehicles, review displayed rates, and negotiate your final rental price directly on WhatsApp or phone. Self-drive bike rentals are also in preparation and launching soon.
              </p>
              <div className="mt-7">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#071D3A] hover:bg-[#0B2345] text-white font-semibold text-sm transition-colors"
                >
                  <span>Know More</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FREQUENTLY ASKED QUESTIONS */}
      <FAQSection />

      {/* SECTION 9 — FINAL CTA */}
      <section className="bg-[#071D3A] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-[#0B2345] to-[#071D3A] border border-white/10 p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="w-12 h-0.5 bg-[#F36B16] mb-4" aria-hidden="true" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
                Ready to Hit the Road?
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
                Choose your ride and get in touch with us anywhere in Rourkela to plan your next journey.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 shrink-0">
              <button
                type="button"
                onClick={() => openBooking()}
                className="px-6 py-3.5 rounded-xl bg-[#F36B16] hover:bg-[#d95b0e] text-white font-semibold text-sm sm:text-base transition-colors whitespace-nowrap cursor-pointer"
              >
                Book Your Ride
              </button>
              <a
                href={BRAND_CONFIG.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm sm:text-base transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
