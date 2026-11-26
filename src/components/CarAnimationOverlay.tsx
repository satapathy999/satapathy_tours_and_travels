import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Volume2, VolumeX, X, ChevronRight, Gauge } from 'lucide-react';

interface CarAnimationOverlayProps {
  isVisible: boolean;
  onComplete: () => void;
}

export function CarAnimationOverlay({ isVisible, onComplete }: CarAnimationOverlayProps) {
  const [speed, setSpeed] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      return localStorage.getItem('satapathy_sound_enabled') === 'true';
    } catch {
      return false;
    }
  });

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Synthesize a brief, subtle, high-end automotive engine rev using Web Audio API
  const playEngineSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Pitch sweep: from 55Hz (idle rumble) up to 180Hz (high-rpm rev)
      osc.type = 'sawtooth';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(55, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.8);
      osc.frequency.exponentialRampToValueAtTime(190, now + 1.8);

      // Low pass filter for deep engine throatiness
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, now);
      filter.frequency.linearRampToValueAtTime(450, now + 1.8);

      // Volume envelope (subtle, non-intrusive)
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.3);
      gain.gain.linearRampToValueAtTime(0.08, now + 1.5);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.0);
    } catch {
      // Audio autoplay policy or unsupported: fail silently
    }
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('satapathy_sound_enabled', String(next));
      } catch {}
      return next;
    });
  };

  useEffect(() => {
    if (!isVisible) {
      setSpeed(0);
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
        audioCtxRef.current = null;
      }
      return;
    }

    const durationMs = 2000;
    const startTime = performance.now();
    let animId: number;

    playEngineSound();

    const updateSpeed = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Smooth continuous exponential acceleration curve up to 160 km/h
      const currentSpeed = Math.round(160 * Math.pow(progress, 1.25));
      setSpeed(currentSpeed);

      if (elapsed < durationMs) {
        animId = requestAnimationFrame(updateSpeed);
      }
    };

    animId = requestAnimationFrame(updateSpeed);

    const timer = window.setTimeout(() => {
      onComplete();
    }, durationMs);

    // Allow user to press ESC to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
        audioCtxRef.current = null;
      }
    };
  }, [isVisible, onComplete, soundEnabled]);

  // Derive gear and status
  const currentGear = speed < 35 ? 'GEAR 1' : speed < 80 ? 'GEAR 2' : speed < 125 ? 'GEAR 3' : 'GEAR 4 (BOOST)';
  const currentStatus = speed < 40 ? 'ENGINE ENGAGED' : speed < 90 ? 'ACCELERATING' : speed < 135 ? 'HIGH SPEED CRUISE' : 'FLEET READY';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="car-section-animation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: 'blur(10px)',
            transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[120] bg-[#020611]/95 backdrop-blur-md flex flex-col items-center justify-between py-6 px-4 overflow-hidden select-none"
          role="dialog"
          aria-label="Car section 2-second launch animation"
        >
          {/* Radial twilight & speed glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(243, 107, 22, 0.25) 0%, rgba(11, 28, 56, 0.75) 45%, rgba(2, 6, 17, 0.98) 85%)',
            }}
          />

          {/* Perspective speed grid */}
          <div
            className="absolute inset-0 opacity-[0.14] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(243, 107, 22, 0.2) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 80%)',
            }}
          />

          {/* Glowing horizontal light beam */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F36B16]/50 to-transparent pointer-events-none" />

          {/* ============================================================ */}
          {/* TOP BAR: BADGE, AUDIO TOGGLE, SKIP BUTTON                   */}
          {/* ============================================================ */}
          <div className="relative z-20 w-full max-w-5xl flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F36B16]/15 border border-[#F36B16]/40 text-[#F36B16] text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 animate-pulse" />
              <span>Self-Drive Fleet Launch</span>
            </motion.div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleSound}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white text-xs font-semibold backdrop-blur-md transition-colors cursor-pointer"
                title={soundEnabled ? 'Mute engine sound' : 'Enable engine sound'}
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#F36B16]" />
                    <span className="hidden sm:inline">Engine Audio On</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                    <span className="hidden sm:inline">Audio Off</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onComplete}
                className="group inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all cursor-pointer hover:border-[#F36B16]"
              >
                <span>Skip</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#F36B16] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CENTER: SPEEDOMETER & GEAR HUD                               */}
          {/* ============================================================ */}
          <div className="relative z-10 flex flex-col items-center text-center my-auto">
            {/* Speed HUD Gauge */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="relative mb-2 flex flex-col items-center"
            >
              {/* Gear and Status Badge */}
              <div className="inline-flex items-center gap-2 mb-1 px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-slate-300">
                <span className="text-[#F36B16]">{currentGear}</span>
                <span className="text-white/30">•</span>
                <span className="text-slate-200">{currentStatus}</span>
              </div>

              {/* Digital Speed Counter */}
              <div className="flex items-baseline gap-2">
                <span className="text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-[#F36B16] tabular-nums tracking-tighter drop-shadow-[0_4px_24px_rgba(243,107,22,0.7)]">
                  {speed}
                </span>
                <span className="text-xs sm:text-base font-extrabold uppercase tracking-widest text-slate-300">
                  KM/H
                </span>
              </div>

              {/* Dynamic 20-Segment Tachometer RPM Bar */}
              <div className="flex items-center gap-1 sm:gap-1.5 mt-2">
                {Array.from({ length: 20 }).map((_, i) => {
                  const active = (speed / 160) * 20 > i;
                  return (
                    <motion.span
                      key={i}
                      className={`h-2 sm:h-3 w-1 sm:w-1.5 rounded-xs transition-colors duration-75 ${
                        active
                          ? i > 16
                            ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.9)]'
                            : i > 11
                            ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]'
                            : 'bg-[#F36B16] shadow-[0_0_8px_rgba(243,107,22,0.9)]'
                          : 'bg-white/10'
                      }`}
                    />
                  );
                })}
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight"
            >
              Satapathy Self-Drive Fleet
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.18 }}
              className="mt-1 text-xs sm:text-sm font-semibold text-slate-300 tracking-[0.22em] uppercase"
            >
              Scorpio • Baleno Auto • Amaze • Swift Dzire • Fronx
            </motion.p>
          </div>

          {/* ============================================================ */}
          {/* LOWER SECTION: HIGHWAY TRACK WITH FULL ACCELERATING CAR     */}
          {/* ============================================================ */}
          <div className="relative z-10 w-full max-w-5xl h-36 sm:h-44 overflow-hidden rounded-2xl bg-gradient-to-t from-white/[0.04] to-transparent border-b border-white/10">
            {/* Speed motion lines in background */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.08) 60px, rgba(255,255,255,0.08) 62px)',
              }}
            />

            {/* Fast Rushing Highway Center Dashes */}
            <motion.div
              initial={{ x: '0%' }}
              animate={{ x: '-50%' }}
              transition={{ duration: 0.35, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-6 left-0 w-[200%] flex items-center gap-6 opacity-85"
              aria-hidden="true"
            >
              {Array.from({ length: 36 }).map((_, idx) => (
                <span
                  key={idx}
                  className="w-16 sm:w-24 h-1.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-white shadow-[0_0_10px_rgba(243,107,22,0.9)] shrink-0"
                />
              ))}
            </motion.div>

            {/* Road borders & glowing asphalt lines */}
            <div className="absolute bottom-10 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#F36B16] to-transparent opacity-80" />
            <div className="absolute bottom-3 inset-x-0 h-[1px] bg-white/20" />

            {/* -------------------------------------------------------- */}
            {/* THE ACCELERATING RACING CAR                               */}
            {/* Starts 100% off-screen on all screen sizes (x: '-130%')   */}
            {/* -------------------------------------------------------- */}
            <motion.div
              initial={{ x: '-130%', opacity: 1 }}
              animate={{
                x: ['-130%', '15vw', '42vw', '130vw'],
                y: [0, -2, 1, 0],
              }}
              transition={{
                duration: 2.0,
                times: [0, 0.32, 0.65, 1],
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute bottom-[20px] left-0 w-64 sm:w-80 pointer-events-none"
            >
              {/* Ultra Bright Headlight Beam Cone */}
              <div
                className="absolute right-[-100px] bottom-5 w-48 h-14 rounded-r-full blur-[4px] opacity-95 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(243, 107, 22, 0.65) 40%, rgba(255, 255, 255, 0) 100%)',
                }}
              />

              {/* Glowing Amber Road Underglow */}
              <div className="absolute left-10 right-10 -bottom-1 h-4 rounded-full bg-[#F36B16] blur-md pointer-events-none" />

              <svg viewBox="0 0 320 100" className="w-full h-auto drop-shadow-[0_16px_28px_rgba(0,0,0,0.95)]">
                {/* Wind / speed streaks behind vehicle */}
                <line x1="0" y1="52" x2="48" y2="52" stroke="#F36B16" strokeWidth="3.5" strokeLinecap="round" opacity="0.95" />
                <line x1="12" y1="64" x2="62" y2="64" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                <line x1="2" y1="74" x2="42" y2="74" stroke="#F36B16" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />

                {/* Animated Exhaust Flame with Multi-layer Nitro Blast */}
                <motion.polygon
                  points="28,62 6,66 28,70"
                  animate={{
                    opacity: [0.7, 1, 0.5, 1],
                    scaleX: [1, 1.5, 0.9, 1.4],
                  }}
                  transition={{ duration: 0.12, repeat: Infinity }}
                  fill="#FF4500"
                />
                <motion.polygon
                  points="28,64 12,66 28,68"
                  animate={{
                    opacity: [0.8, 1, 0.6, 1],
                    scaleX: [1, 1.3, 0.8, 1.2],
                  }}
                  transition={{ duration: 0.12, repeat: Infinity }}
                  fill="#FBBF24"
                />
                <circle cx="30" cy="66" r="3.5" fill="#FFF" />

                {/* Aerodynamic Car Body with Sleek Contours */}
                <path
                  d="M40 68 L40 50 C40 42, 50 38, 66 36 L108 16 C126 10, 168 10, 202 16 L248 36 L292 40 C304 43, 312 50, 312 60 L312 68 Z"
                  fill="url(#racingCarGradPerfect)"
                />

                {/* Tinted Panoramic Windshield & Windows */}
                <path d="M112 20 L162 16 L162 35 L86 35 Z" fill="#020611" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                <path d="M168 16 L200 18 L238 35 L168 35 Z" fill="#020611" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />

                {/* Glossy Window Glass Sheen */}
                <line x1="114" y1="24" x2="156" y2="18" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                <line x1="172" y1="20" x2="198" y2="21" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />

                {/* Orange Racing Belt Accent Stripe */}
                <path d="M54 54 L298 54" stroke="#F36B16" strokeWidth="4.5" strokeLinecap="round" />

                {/* Projector LED Headlight */}
                <rect x="296" y="46" width="16" height="8" rx="2" fill="#FFFFFF" />
                <rect x="306" y="47" width="6" height="6" rx="1" fill="#FFF3E9" />

                {/* Smoked Red LED Taillight */}
                <rect x="40" y="46" width="10" height="7" rx="2" fill="#EF4444" />
                <line x1="34" y1="49" x2="40" y2="49" stroke="#EF4444" strokeWidth="2.5" />

                {/* Rear Sport Alloy Wheel */}
                <g transform="translate(96,70)">
                  <circle cx="0" cy="0" r="20" fill="#020611" stroke="#E2E8F0" strokeWidth="4.5" />
                  <circle cx="0" cy="0" r="15" fill="none" stroke="#F36B16" strokeWidth="2.5" strokeDasharray="3 3" />
                  <circle cx="0" cy="0" r="7" fill="#F36B16" />
                  <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.22, repeat: Infinity, ease: 'linear' }}
                  >
                    <line x1="-14" y1="0" x2="14" y2="0" stroke="#94A3B8" strokeWidth="2.5" />
                    <line x1="0" y1="-14" x2="0" y2="14" stroke="#94A3B8" strokeWidth="2.5" />
                    <line x1="-10" y1="-10" x2="10" y2="10" stroke="#94A3B8" strokeWidth="2" />
                    <line x1="-10" y1="10" x2="10" y2="-10" stroke="#94A3B8" strokeWidth="2" />
                  </motion.g>
                </g>

                {/* Front Sport Alloy Wheel */}
                <g transform="translate(260,70)">
                  <circle cx="0" cy="0" r="20" fill="#020611" stroke="#E2E8F0" strokeWidth="4.5" />
                  <circle cx="0" cy="0" r="15" fill="none" stroke="#F36B16" strokeWidth="2.5" strokeDasharray="3 3" />
                  <circle cx="0" cy="0" r="7" fill="#F36B16" />
                  <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.22, repeat: Infinity, ease: 'linear' }}
                  >
                    <line x1="-14" y1="0" x2="14" y2="0" stroke="#94A3B8" strokeWidth="2.5" />
                    <line x1="0" y1="-14" x2="0" y2="14" stroke="#94A3B8" strokeWidth="2.5" />
                    <line x1="-10" y1="-10" x2="10" y2="10" stroke="#94A3B8" strokeWidth="2" />
                    <line x1="-10" y1="10" x2="10" y2="-10" stroke="#94A3B8" strokeWidth="2" />
                  </motion.g>
                </g>

                <defs>
                  <linearGradient id="racingCarGradPerfect" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="55%" stopColor="#F8FAFC" />
                    <stop offset="100%" stopColor="#94A3B8" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>

          {/* ============================================================ */}
          {/* EXACT 2.0-SECOND LINEAR PROGRESS BAR                        */}
          {/* ============================================================ */}
          <div className="relative z-10 w-full max-w-md mt-4">
            <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.0, ease: 'linear' }}
                className="h-full bg-gradient-to-r from-[#F36B16] via-[#FF8A3D] to-white origin-left shadow-[0_0_12px_#F36B16]"
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-400 font-semibold mt-1 px-1">
              <span>0.0s</span>
              <span className="text-[#F36B16] font-bold tracking-wider">NAVIGATING TO CARS</span>
              <span>2.0s</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
