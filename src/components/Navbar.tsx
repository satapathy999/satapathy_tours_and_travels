import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { BRAND_CONFIG } from '../data/vehicles';
import { useBooking } from '../context/BookingContext';
import { MobileMenu } from './MobileMenu';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Car Rental', to: '/car-rental-rourkela' },
  { label: 'Bike Rental', to: '/bike-rental-rourkela' },
  { label: 'Tour Packages', to: '/tour-packages' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBooking, triggerCarAnimation } = useBooking();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white border-b border-[#E5EAF0] transition-shadow duration-200 ${
          scrolled ? 'shadow-md' : 'shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[60px] md:h-[74px] flex items-center justify-between gap-6 lg:gap-8">
            {/* Zone 1: Brand Logo */}
            <Link
              to="/"
              className="inline-flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F36B16] rounded-lg"
              aria-label={`${BRAND_CONFIG.name} — Home`}
            >
              <img
                src={BRAND_CONFIG.logoPath}
                alt={BRAND_CONFIG.name}
                className="h-11 md:h-13 w-auto object-contain"
              />
            </Link>

            {/* Zone 2: Desktop Navigation Links */}
            <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => {
                    if (item.to === '/car-rental-rourkela' || item.to === '/cars') {
                      triggerCarAnimation();
                    }
                  }}
                  className={({ isActive }) =>
                    `relative py-1.5 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 ${
                      isActive
                        ? 'text-[#F36B16]'
                        : 'text-[#172337] hover:text-[#F36B16]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      <span
                        aria-hidden="true"
                        className={`absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-[#F36B16] transition-transform duration-150 origin-left ${
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Zone 3: Primary CTA & Mobile Trigger */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => openBooking()}
                className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#F36B16] hover:bg-[#d95b0e] text-white text-sm font-semibold whitespace-nowrap shrink-0 shadow-xs transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#071D3A]"
              >
                Book Now
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
                className="md:hidden w-11 h-11 inline-flex items-center justify-center rounded-xl border border-[#E5EAF0] text-[#071D3A] hover:bg-[#F5F7FA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F36B16]"
              >
                <Menu className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={NAV_ITEMS}
      />
    </>
  );
}
