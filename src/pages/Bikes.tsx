import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bike,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileCheck,
  Info,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { BRAND_CONFIG, SERVICE_AREAS_ROURKELA } from '../data/vehicles';
import { usePageMeta } from '../utils/seo';
import {
  sanitizeInput,
  validateFullName,
  validateIndianMobile,
} from '../utils/validation';
import {
  buildBikeEnquiryEmailUrl,
  buildBikeEnquiryWhatsAppUrl,
  triggerExternalEmail,
  triggerExternalWhatsApp,
} from '../utils/whatsapp';
import { ResilientImage } from '../components/ResilientImage';
import { SectionHeading } from '../components/SectionHeading';

const BIKE_RENTAL_FAQS = [
  {
    q: 'What types of two-wheelers are available for rent in Rourkela?',
    a: 'We are expanding our fleet with popular gearless scooters (like Honda Activa 6G and TVS Jupiter) for convenient city rides and daily errands, alongside commuter and touring motorcycles (such as Bajaj Pulsar, TVS Apache, and Royal Enfield) for longer road trips.',
  },
  {
    q: 'What documents are required to rent a bike or scooter in Rourkela?',
    a: 'You need an original and valid Two-Wheeler Driving Licence (DL) and an Aadhaar Card. We perform a quick 2-minute digital verification via WhatsApp before handing over the keys.',
  },
  {
    q: 'Do you provide helmets with the rental two-wheeler?',
    a: 'Yes! Safety is our top priority. Every scooter and bike rental includes a sanitized, ISI-certified rider helmet at no extra cost. An additional pillion helmet can also be provided upon request.',
  },
  {
    q: 'Can I rent a scooter for a week or an entire month in Rourkela?',
    a: 'Yes. We offer flexible daily, weekly, and monthly rental terms with attractive negotiable rates for students, working professionals, and business visitors in Rourkela.',
  },
  {
    q: 'Where can I pick up the rental bike in Rourkela?',
    a: 'Pickup and doorstep delivery are available across Rourkela, including Rourkela Railway Station, Civil Township, Koel Nagar, Chhend Colony, Panposh, and Sectors 1 to 21.',
  },
];

export function Bikes() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [vehiclePreference, setVehiclePreference] = useState<'Scooter' | 'Motorcycle' | 'Both'>('Scooter');
  const [duration, setDuration] = useState('1 Day');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [readyLinks, setReadyLinks] = useState<{
    whatsappUrl: string;
    emailUrl: string;
  } | null>(null);

  // Structured Data Schema for Bike & Scooter Rental
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Bike and Scooter Rental in Rourkela',
    provider: {
      '@type': 'AutoRental',
      name: BRAND_CONFIG.name,
      url: `${BRAND_CONFIG.websiteUrl}/bike-rental-rourkela`,
      telephone: BRAND_CONFIG.phoneDisplay,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Rourkela',
        addressRegion: 'Odisha',
        addressCountry: 'IN',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Rourkela',
    },
    description:
      'Affordable scooter and motorcycle rentals in Rourkela, Odisha. Gearless scooters and motorcycles for city commute and weekend road trips.',
  };

  usePageMeta({
    title: 'Bike & Scooter Rental in Rourkela – Motorcycle Hire | Satapathy Travels',
    description:
      'Affordable bike rental and scooter hire in Rourkela, Odisha. Easy daily & weekly rates on Activa, Jupiter & motorcycles. Enquire on WhatsApp +91 78548 88381.',
    canonical: '/bike-rental-rourkela',
    structuredData,
  });

  const submitInterest = (channel: 'WhatsApp' | 'Email' | 'Both') => {
    const nextErrors: Record<string, string> = {};

    const nameErr = validateFullName(name);
    if (nameErr) nextErrors.name = nameErr;

    const phoneErr = validateIndianMobile(mobile);
    if (phoneErr) nextErrors.mobile = phoneErr;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const fullNote = `Preference: ${vehiclePreference} | Duration: ${duration} | ${sanitizeInput(note, 200)}`;
    const whatsappUrl = buildBikeEnquiryWhatsAppUrl(name, mobile, fullNote);
    const emailUrl = buildBikeEnquiryEmailUrl(name, mobile, fullNote);

    if (channel === 'WhatsApp') {
      triggerExternalWhatsApp(whatsappUrl);
    } else if (channel === 'Email') {
      triggerExternalEmail(emailUrl);
    } else {
      triggerExternalWhatsApp(whatsappUrl);
      triggerExternalEmail(emailUrl);
    }

    setReadyLinks({ whatsappUrl, emailUrl });
  };

  const handleInterestSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitInterest('WhatsApp');
  };

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative bg-[#071D3A] text-white overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-0.5 bg-[#F36B16]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#F36B16]">
                  Two-Wheeler Rentals in Rourkela
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance">
                Bike &amp; Scooter Rental in Rourkela – Quick, Affordable &amp; Flexible
              </h1>

              <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Looking for convenient two-wheeler mobility in Rourkela? Rent scooters like Honda
                Activa and TVS Jupiter for easy city commuting, or hire motorcycles for scenic road
                trips around Sundargarh.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href={BRAND_CONFIG.whatsappBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm sm:text-base transition-colors shadow-md"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <a
                  href={BRAND_CONFIG.phoneHref}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm sm:text-base transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#F36B16]" />
                  <span>Call {BRAND_CONFIG.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* HERO BIKE IMAGE */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900 aspect-16/10">
                <ResilientImage
                  src={BRAND_CONFIG.bikeHeroImage}
                  alt="Bike and scooter rental in Rourkela - Satapathy Tour and Travel"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#0B2345] border border-white/10 p-4 rounded-2xl shadow-xl text-xs text-white max-w-xs">
                <span className="block font-bold text-[#F36B16] uppercase tracking-wider text-[11px] mb-1">
                  Enquiries Open
                </span>
                <span>Pre-book your favorite scooter or bike for instant delivery in Rourkela.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — TWO-WHEELER CATEGORIES */}
      <section className="py-16 sm:py-20 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Vehicle Categories"
            title="Scooter &amp; Motorcycle Options in Rourkela"
            description="Choose the right ride for your daily city errand, office commute, or weekend exploration."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Scooter Card */}
            <div className="bg-white rounded-3xl border border-[#E5EAF0] p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF3E9] text-[#F36B16] flex items-center justify-center">
                  <Bike className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700">
                  Most Popular for City
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#071D3A]">Scooter Rental (Activa / Jupiter)</h3>
              <p className="mt-2 text-sm text-[#697586] leading-relaxed">
                Lightweight, automatic transmission gearless scooters ideal for navigating Rourkela market areas, Steel Plant gates, college campuses, and daily commutes with maximum fuel economy.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-[#172337]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Effortless gearless automatic drive</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>High mileage (50+ kmpl) for budget travel</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Under-seat storage space for bags and shopping</span>
                </li>
              </ul>
              <div className="mt-6 pt-5 border-t border-[#E5EAF0]">
                <button
                  type="button"
                  onClick={() => {
                    setVehiclePreference('Scooter');
                    const formElement = document.getElementById('enquiry-form');
                    formElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F36B16] hover:text-[#d95b0e] cursor-pointer"
                >
                  <span>Enquire for Scooter Rental</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Motorcycle Card */}
            <div className="bg-white rounded-3xl border border-[#E5EAF0] p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#071D3A] text-white flex items-center justify-center">
                  <Bike className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                  Ideal for Highways &amp; Tours
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#071D3A]">Motorcycle Rental (Pulsar / Apache / Classic)</h3>
              <p className="mt-2 text-sm text-[#697586] leading-relaxed">
                Sturdy, powerful motorcycles built for highway cruising, weekend trips to Mandira Dam or Khandadhar, and riders who love the thrill of geared two-wheelers.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-[#172337]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Solid suspension and power for highway cruising</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Well-maintained engine, tires, and brakes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ISI-approved helmets provided with every rental</span>
                </li>
              </ul>
              <div className="mt-6 pt-5 border-t border-[#E5EAF0]">
                <button
                  type="button"
                  onClick={() => {
                    setVehiclePreference('Motorcycle');
                    const formElement = document.getElementById('enquiry-form');
                    formElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F36B16] hover:text-[#d95b0e] cursor-pointer"
                >
                  <span>Enquire for Motorcycle Rental</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — INTERACTIVE ENQUIRY FORM */}
      <section id="enquiry-form" className="py-16 sm:py-24 bg-white border-y border-[#E5EAF0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F5F7FA] rounded-3xl border border-[#E5EAF0] p-6 sm:p-10 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-5 h-5 text-[#F36B16]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#F36B16]">
                Fast Booking Coordination
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071D3A]">
              Enquire for Bike &amp; Scooter Rental
            </h2>
            <p className="mt-2 text-sm text-[#697586]">
              Fill in your details below and we will confirm vehicle availability and best rental pricing instantly on WhatsApp.
            </p>

            <form onSubmit={handleInterestSubmit} className="mt-8 space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#071D3A] mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl border border-[#E5EAF0] bg-white text-sm focus:outline-2 focus:outline-[#F36B16]"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#071D3A] mb-1.5">
                  Mobile Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="10-digit mobile number (e.g. 9876543210)"
                  className="w-full px-4 py-3 rounded-xl border border-[#E5EAF0] bg-white text-sm focus:outline-2 focus:outline-[#F36B16]"
                />
                {errors.mobile && <p className="mt-1 text-xs text-red-500">{errors.mobile}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#071D3A] mb-1.5">
                    Vehicle Preference
                  </label>
                  <select
                    value={vehiclePreference}
                    onChange={(e) => setVehiclePreference(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5EAF0] bg-white text-sm focus:outline-2 focus:outline-[#F36B16]"
                  >
                    <option value="Scooter">Scooter (Activa / Jupiter)</option>
                    <option value="Motorcycle">Motorcycle (Pulsar / Apache)</option>
                    <option value="Both">Open to Any Two-Wheeler</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#071D3A] mb-1.5">
                    Rental Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5EAF0] bg-white text-sm focus:outline-2 focus:outline-[#F36B16]"
                  >
                    <option value="12 Hours">12 Hours (Half Day)</option>
                    <option value="1 Day">24 Hours (Full Day)</option>
                    <option value="2-3 Days">2 to 3 Days</option>
                    <option value="1 Week">1 Week (Weekly Package)</option>
                    <option value="1 Month">1 Month (Monthly Commute)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#071D3A] mb-1.5">
                  Pickup Area in Rourkela / Notes (Optional)
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Near Rourkela Station, Civil Township, or Chhend"
                  className="w-full px-4 py-3 rounded-xl border border-[#E5EAF0] bg-white text-sm focus:outline-2 focus:outline-[#F36B16]"
                />
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Send WhatsApp Enquiry</span>
                </button>

                <button
                  type="button"
                  onClick={() => submitInterest('Email')}
                  className="py-3.5 px-5 rounded-xl bg-[#071D3A] hover:bg-[#0B2345] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 4 — LOCAL BIKE RENTAL FAQS */}
      <section className="py-16 sm:py-24 bg-[#F5F7FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Rourkela Bike FAQs"
            title="Questions About Bike &amp; Scooter Rentals in Rourkela"
            description="Clear answers on documentation, security deposit, and pickup in Rourkela."
          />

          <div className="mt-10 space-y-3.5">
            {BIKE_RENTAL_FAQS.map((faq, idx) => {
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
    </div>
  );
}
