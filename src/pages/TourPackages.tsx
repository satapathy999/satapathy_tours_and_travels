import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  Compass,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { BRAND_CONFIG, ODISHA_TOUR_PACKAGES, type TourPackage } from '../data/vehicles';
import { usePageMeta } from '../utils/seo';
import { buildTourPackageWhatsAppUrl, triggerExternalWhatsApp } from '../utils/whatsapp';
import { SectionHeading } from '../components/SectionHeading';
import { ResilientImage } from '../components/ResilientImage';

const TOUR_FAQS = [
  {
    q: 'Can I customize my tour itinerary from Rourkela?',
    a: 'Yes, absolutely! All our Odisha tour packages are 100% customizable. You can adjust the departure time, add or remove sightseeing spots (such as adding Darjeeng to your Khandadhar trip or visiting Samaleswari Temple during your Debrigarh tour), and pick your desired rental duration.',
  },
  {
    q: 'Do you offer both self-drive and with-driver car options for tours?',
    a: 'Yes. You can choose total privacy and freedom with our self-drive cars (like the Mahindra Scorpio 7-seater SUV, Honda Amaze, or Maruti Baleno), or hire a comfortable car with a polite, experienced local driver who knows the highway routes across Odisha.',
  },
  {
    q: 'How does pricing work for outstation tour packages?',
    a: 'All tour package rates are transparent and negotiable. Pricing depends on your chosen vehicle, rental duration (e.g. 1-day, 2-day, or multi-day), and whether you opt for self-drive or driver-assisted rental. Connect with us on WhatsApp or call +91 78548 88381 for the best customized quote.',
  },
  {
    q: 'Which vehicle is recommended for Khandadhar Falls or Similipal National Park?',
    a: 'For hilly and forested terrains like Khandadhar Waterfall or Similipal Biosphere Reserve, we strongly recommend our high ground clearance vehicles such as the Mahindra Scorpio (7-seater SUV) or Maruti Suzuki Fronx crossover.',
  },
  {
    q: 'Is doorstep vehicle delivery available in Rourkela for tour packages?',
    a: 'Yes! We deliver the vehicle right to your home, hotel, or Rourkela Railway Station anywhere in Rourkela, including Civil Township, Koel Nagar, Chhend, Panposh, Uditnagar, and Sectors 1 to 21.',
  },
];

export function TourPackages() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [travelers, setTravelers] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [notes, setNotes] = useState('');

  // Structured Data Schema for Local Tour Services
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Tour Packages and Travel Services from Rourkela',
    provider: {
      '@type': 'TravelAgency',
      name: BRAND_CONFIG.name,
      url: BRAND_CONFIG.websiteUrl,
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
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Odisha Tour Packages',
      itemListElement: ODISHA_TOUR_PACKAGES.map((pkg) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Trip',
          name: pkg.name,
          description: pkg.description,
        },
      })),
    },
  };

  usePageMeta({
    title: 'Tour Packages from Rourkela – Odisha Sightseeing & Outstation Trips',
    description:
      'Book custom Odisha tour packages from Rourkela with Satapathy Tour and Travel. Khandadhar Falls, Mandira Dam, Debrigarh Wildlife, Similipal & Puri tours. Self-drive or with driver.',
    canonical: '/tour-packages',
    structuredData,
  });

  const handleQuickEnquire = (pkg: TourPackage) => {
    const url = buildTourPackageWhatsAppUrl(pkg.name, travelers, travelDate, notes);
    triggerExternalWhatsApp(url);
  };

  return (
    <div className="bg-white">
      {/* SECTION 1 — PAGE HERO */}
      <section className="relative bg-[#071D3A] overflow-hidden">
        <div className="absolute inset-0">
          <ResilientImage
            src={BRAND_CONFIG.aboutImage}
            alt="Scenic road trip with Satapathy Tour and Travel"
            lazy={false}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#071D3A]/95 via-[#071D3A]/85 to-[#071D3A]/60"
            aria-hidden="true"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-[#F36B16]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#F36B16]">
                Tour &amp; Travel Packages from Rourkela
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance">
              Explore Odisha with Tailored Tour Packages from Rourkela
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-200 leading-relaxed">
              Discover the natural wonders, cascading waterfalls, wildlife sanctuaries, and sacred
              pilgrimage circuits of Odisha. Travel in comfortable self-drive SUVs or hire
              chauffeur-driven cars with complete peace of mind.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={BRAND_CONFIG.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm sm:text-base transition-colors shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Custom Tour Enquiry on WhatsApp</span>
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
        </div>
      </section>

      {/* SECTION 2 — SERVICE HIGHLIGHTS PILLARS */}
      <section className="bg-[#FFF3E9] border-b border-[#F36B16]/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Compass className="w-5 h-5 text-[#F36B16] shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-[#071D3A]">
                Customized Itineraries
              </span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <ShieldCheck className="w-5 h-5 text-[#F36B16] shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-[#071D3A]">
                Self-Drive or With Driver
              </span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <MapPin className="w-5 h-5 text-[#F36B16] shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-[#071D3A]">
                Doorstep Pickup in Rourkela
              </span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Sparkles className="w-5 h-5 text-[#F36B16] shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-[#071D3A]">
                100% Negotiable Rates
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — FEATURED TOUR PACKAGES LISTING */}
      <section className="py-16 sm:py-24 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Popular Odisha Excursions"
            title="Curated Tour Packages Originating from Rourkela"
            description="All packages include choice of reliable vehicles, flexible timelines, and personal coordination from Satapathy Tour and Travel."
          />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ODISHA_TOUR_PACKAGES.map((pkg) => (
              <article
                key={pkg.id}
                className="bg-white rounded-3xl border border-[#E5EAF0] shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between"
              >
                <div className="p-6 sm:p-8">
                  {/* Badge & Duration */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF3E9] text-[#F36B16] text-xs font-bold uppercase tracking-wider">
                      <Calendar className="w-3.5 h-3.5" />
                      {pkg.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-[#F36B16]" />
                      {pkg.destination}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#071D3A] leading-snug">
                    {pkg.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-[#F36B16]">{pkg.tagline}</p>
                  <p className="mt-3 text-sm text-[#697586] leading-relaxed">{pkg.description}</p>

                  {/* Sightseeing spots covered */}
                  <div className="mt-5 pt-4 border-t border-[#E5EAF0]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#071D3A] mb-2.5">
                      Key Sightseeing Places:
                    </h4>
                    <ul className="space-y-1.5">
                      {pkg.places.map((place) => (
                        <li key={place} className="flex items-start gap-2 text-xs sm:text-sm text-[#172337]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{place}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommended Vehicle */}
                  <div className="mt-5 p-3.5 rounded-xl bg-[#F5F7FA] border border-[#E5EAF0] text-xs text-[#071D3A]">
                    <span className="font-bold text-[#F36B16]">Recommended Vehicles: </span>
                    <span className="text-[#697586] font-medium">{pkg.recommendedVehicles}</span>
                  </div>
                </div>

                {/* Card CTA Footer */}
                <div className="px-6 sm:px-8 py-4 bg-[#F5F7FA] border-t border-[#E5EAF0] flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-500 font-medium">
                    Negotiable pricing based on group &amp; dates
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuickEnquire(pkg)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enquire on WhatsApp</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — HOW TOUR BOOKINGS WORK */}
      <section className="py-16 sm:py-20 bg-white border-y border-[#E5EAF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Smooth Planning"
            title="How to Book a Tour Package from Rourkela"
            description="Book your preferred tour package in 3 straightforward steps with zero complicated paperwork."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F5F7FA] border border-[#E5EAF0]">
              <div className="w-10 h-10 rounded-xl bg-[#F36B16] text-white flex items-center justify-center font-extrabold text-lg mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-[#071D3A]">Select Your Tour Itinerary</h3>
              <p className="mt-2 text-sm text-[#697586] leading-relaxed">
                Choose an itinerary from our curated list (e.g. Khandadhar, Debrigarh, Similipal, or Puri) or tell us your custom travel route.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-[#F5F7FA] border border-[#E5EAF0]">
              <div className="w-10 h-10 rounded-xl bg-[#F36B16] text-white flex items-center justify-center font-extrabold text-lg mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-[#071D3A]">Pick Vehicle &amp; Driver Mode</h3>
              <p className="mt-2 text-sm text-[#697586] leading-relaxed">
                Choose self-drive privacy (Scorpio, Baleno, Amaze) or hire an experienced driver. Discuss and agree upon your negotiable rate.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-[#F5F7FA] border border-[#E5EAF0]">
              <div className="w-10 h-10 rounded-xl bg-[#F36B16] text-white flex items-center justify-center font-extrabold text-lg mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-[#071D3A]">Doorstep Handover &amp; Depart</h3>
              <p className="mt-2 text-sm text-[#697586] leading-relaxed">
                We handover the vehicle right at your location in Rourkela with full sanitization and maintenance checks. Enjoy your trip!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — LOCAL TOUR FAQS ACCORDION */}
      <section className="py-16 sm:py-24 bg-[#F5F7FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Got Questions?"
            title="Frequently Asked Questions About Odisha Tours"
            description="Helpful insights to plan your upcoming road trips and holidays from Rourkela."
          />

          <div className="mt-10 space-y-3.5">
            {TOUR_FAQS.map((faq, idx) => {
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

      {/* SECTION 6 — FINAL CTA */}
      <section className="py-16 bg-[#071D3A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#F36B16]">
              Ready to Explore?
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
              Plan Your Dream Odisha Road Trip Today
            </h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-xl">
              Connect directly with Ayush Satapathy and our travel team for customized itineraries, vehicle availability, and competitive negotiable pricing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={BRAND_CONFIG.whatsappBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm sm:text-base transition-colors shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Us</span>
            </a>
            <a
              href={BRAND_CONFIG.phoneHref}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F36B16] hover:bg-[#d95b0e] text-white font-semibold text-sm sm:text-base transition-colors shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
