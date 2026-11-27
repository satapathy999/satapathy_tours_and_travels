import React, { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MessageCircle, Phone, X } from 'lucide-react';
import { BRAND_CONFIG } from '../data/vehicles';
import { useBooking } from '../context/BookingContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ label: string; to: string }>;
}

export function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const { openBooking, triggerCarAnimation } = useBooking();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    closeBtnRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#071D3A]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5EAF0]">
            <Link to="/" onClick={onClose} className="inline-flex items-center shrink-0">
              <img
                src={BRAND_CONFIG.logoPath}
                alt={BRAND_CONFIG.name}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="w-11 h-11 inline-flex items-center justify-center rounded-xl text-[#172337] hover:bg-[#F5F7FA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F36B16]"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile primary navigation" className="px-4 py-5 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => {
                  if (item.to === '/car-rental-rourkela' || item.to === '/cars') {
                    triggerCarAnimation();
                  }
                  onClose();
                }}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#FFF3E9] text-[#F36B16]'
                      : 'text-[#172337] hover:bg-[#F5F7FA] hover:text-[#071D3A]'
                  }`
                }
              >
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-5 border-t border-[#E5EAF0] bg-[#F5F7FA] space-y-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              openBooking();
            }}
            className="w-full py-3 px-4 rounded-xl bg-[#F36B16] hover:bg-[#d95b0e] text-white font-semibold text-center transition-colors cursor-pointer"
          >
            Book Now
          </button>

          <a
            href={BRAND_CONFIG.whatsappBaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </a>

          <a
            href={BRAND_CONFIG.phoneHref}
            className="w-full py-3 px-4 rounded-xl border border-[#E5EAF0] bg-white hover:bg-slate-50 text-[#071D3A] font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Call {BRAND_CONFIG.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
