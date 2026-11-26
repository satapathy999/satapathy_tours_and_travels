import React, { useEffect, useState } from 'react';
import { BadgeIndianRupee, MessageCircle, Zap } from 'lucide-react';
import { BRAND_CONFIG, CAR_MODELS, type CarModel } from '../data/vehicles';
import { usePageMeta } from '../utils/seo';
import { VehicleCard } from '../components/VehicleCard';
import { VehicleDetailModal } from '../components/VehicleDetailModal';
import { ResilientImage } from '../components/ResilientImage';
import { useBooking } from '../context/BookingContext';

export function Cars() {
  usePageMeta({
    title: 'Self-Drive Cars – Satapathy Tour and Travels',
    description:
      'Explore Scorpio, Baleno Automatic, Honda Amaze, Swift Dzire, Baleno, Fronx, and Swift self-drive car rental packages. All prices are negotiable with direct WhatsApp booking.',
  });

  const [detailCar, setDetailCar] = useState<CarModel | null>(null);
  const { openBooking, triggerCarAnimation, introFinished } = useBooking();

  // Play the 2-second car animation whenever arriving on the Cars page
  useEffect(() => {
    if (introFinished) {
      triggerCarAnimation();
    }
  }, [introFinished, triggerCarAnimation]);

  return (
    <div>
      {/* SECTION 1 — PAGE HERO */}
      <section className="relative bg-[#071D3A] overflow-hidden">
        <div className="absolute inset-0">
          <ResilientImage
            src={BRAND_CONFIG.aboutImage}
            alt="Self-drive cars available for rental"
            lazy={false}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#071D3A]/95 via-[#071D3A]/85 to-[#071D3A]/55"
            aria-hidden="true"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-0.5 bg-[#F36B16]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#F36B16]">
                Self-Drive Car Fleet
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              Find Your Perfect Ride
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
              Explore our self-drive car rental options and choose the right vehicle for your journey.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => triggerCarAnimation()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                title="Click to watch the 2s car animation again"
              >
                <Zap className="w-3.5 h-3.5 text-[#F36B16]" />
                <span>Play 2s Car Animation</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING NOTICE */}
      <section className="bg-[#FFF3E9] border-b border-[#F36B16]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BadgeIndianRupee className="w-5 h-5 text-[#F36B16] shrink-0" aria-hidden="true" />
            <p className="text-sm font-semibold text-[#071D3A]">
              {BRAND_CONFIG.negotiableNotice}
            </p>
          </div>
          <a
            href={BRAND_CONFIG.whatsappBaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F36B16] hover:text-[#d95b0e] whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Discuss Price on WhatsApp</span>
          </a>
        </div>
      </section>

      {/* SECTION 2 — VEHICLE LISTING */}
      <section className="py-14 sm:py-20 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAR_MODELS.map((car) => (
              <VehicleCard
                key={car.id}
                car={car}
                ctaLabel="Book This Car"
                onViewDetails={(selected) => setDetailCar(selected)}
              />
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-white border border-[#E5EAF0] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-[#071D3A]">
                Need help choosing or planning a custom schedule?
              </h2>
              <p className="mt-1.5 text-sm text-[#697586]">
                Submit your preferred pickup and return details and our team will confirm availability and final negotiable pricing.
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

      <VehicleDetailModal car={detailCar} onClose={() => setDetailCar(null)} />
    </div>
  );
}
