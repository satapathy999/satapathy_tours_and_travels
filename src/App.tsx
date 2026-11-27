import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { BookingProvider, useBooking } from './context/BookingContext';
import { IntroSplash } from './components/IntroSplash';
import { CarAnimationOverlay } from './components/CarAnimationOverlay';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileContactBar } from './components/MobileContactBar';
import { Home } from './pages/Home';
import { Cars } from './pages/Cars';
import { Bikes } from './pages/Bikes';
import { TourPackages } from './pages/TourPackages';
import { About } from './pages/About';
import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

function GlobalCarAnimation() {
  const { isCarAnimating, stopCarAnimation } = useBooking();
  return <CarAnimationOverlay isVisible={isCarAnimating} onComplete={stopCarAnimation} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <IntroSplash />
        <GlobalCarAnimation />
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-white text-[#172337] overflow-x-clip">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/car-rental-rourkela" element={<Cars />} />
              <Route path="/cars" element={<Navigate to="/car-rental-rourkela" replace />} />
              <Route path="/bike-rental-rourkela" element={<Bikes />} />
              <Route path="/bikes" element={<Navigate to="/bike-rental-rourkela" replace />} />
              <Route path="/tour-packages" element={<TourPackages />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <FloatingWhatsApp />
          <MobileContactBar />
          <BookingModal />
        </div>
      </BookingProvider>
    </BrowserRouter>
  );
}
