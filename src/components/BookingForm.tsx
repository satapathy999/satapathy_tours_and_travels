import React, { useEffect, useMemo, useState } from 'react';
import {
  Bike,
  Calendar,
  Car,
  Check,
  CheckCircle2,
  Clock,
  Info,
  Layers,
  Mail,
  MessageCircle,
  Minus,
  Plus,
} from 'lucide-react';
import {
  BRAND_CONFIG,
  CAR_MODELS,
  RENTAL_DURATIONS,
  type RentalDuration,
  type VehicleType,
  formatINR,
  getCarById,
} from '../data/vehicles';
import { type BookingPrefill } from '../context/BookingContext';
import {
  addDaysToDateString,
  calculateRentalHours,
  computeMultiCarPriceEstimate,
  type CarSelectionItem,
  formatDisplayTime,
  formatIndianDate,
  formatIndianMobileDisplay,
  getTodayDateString,
  getTomorrowDateString,
  sanitizeInput,
  validateFullName,
  validateIndianMobile,
  validateSchedule,
} from '../utils/validation';
import {
  buildBookingWhatsAppMessage,
  buildMailtoUrl,
  buildWhatsAppUrl,
  triggerExternalEmail,
  triggerExternalWhatsApp,
} from '../utils/whatsapp';
import { BookingSuccess } from './BookingSuccess';
import { ResilientImage } from './ResilientImage';
import { DocumentChecklist } from './DocumentChecklist';

interface BookingFormProps {
  prefill?: BookingPrefill;
  onClose?: () => void;
  showMaybeLater?: boolean;
  onMaybeLater?: () => void;
}

const OTHER_MODEL_ID = 'others';

export function BookingForm({
  prefill,
  onClose,
  showMaybeLater = false,
  onMaybeLater,
}: BookingFormProps) {
  const today = useMemo(() => getTodayDateString(), []);
  const tomorrow = useMemo(() => getTomorrowDateString(), []);

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [vehicleType, setVehicleType] = useState<VehicleType>(prefill?.vehicleType || 'Car');

  // Support multiple cars: map of carId -> quantity (e.g. { 'swift-dzire': 1, 'baleno': 1 })
  const [selectedCars, setSelectedCars] = useState<Record<string, number>>(() => {
    if (prefill?.vehicleId) {
      if (prefill.vehicleId === OTHER_MODEL_ID) {
        return {};
      }
      const found = getCarById(prefill.vehicleId);
      if (found) {
        return { [found.id]: 1 };
      }
    }
    return { [CAR_MODELS[0].id]: 1 };
  });

  const [includeOtherCar, setIncludeOtherCar] = useState<boolean>(() => {
    return prefill?.vehicleId === OTHER_MODEL_ID;
  });

  const [customVehicleText, setCustomVehicleText] = useState('');
  const [duration, setDuration] = useState<RentalDuration>(prefill?.duration || '12 Hours');
  const [customDurationText, setCustomDurationText] = useState('');
  const [pickupDate, setPickupDate] = useState<string>(prefill?.pickupDate || today);
  const [pickupTime, setPickupTime] = useState<string>('09:00');
  const [returnDate, setReturnDate] = useState<string>(
    prefill?.duration === '24 Hours' ? tomorrow : prefill?.pickupDate || today
  );
  const [returnTime, setReturnTime] = useState<string>(
    prefill?.duration === '24 Hours' ? '09:00' : '21:00'
  );
  const [description, setDescription] = useState('');

  const [submittedErrors, setSubmittedErrors] = useState<Record<string, string>>({});
  const [successData, setSuccessData] = useState<{
    whatsappUrl: string;
    emailUrl: string;
    message: string;
    channel: 'WhatsApp' | 'Email' | 'Both';
  } | null>(null);

  useEffect(() => {
    if (prefill?.vehicleType) {
      setVehicleType(prefill.vehicleType);
    }
    if (prefill?.vehicleId) {
      if (prefill.vehicleId === OTHER_MODEL_ID) {
        setIncludeOtherCar(true);
        setSelectedCars({});
      } else {
        const found = getCarById(prefill.vehicleId);
        if (found) {
          setSelectedCars({ [found.id]: 1 });
          setIncludeOtherCar(false);
        }
      }
    }
    if (prefill?.duration) {
      setDuration(prefill.duration);
    }
    if (prefill?.pickupDate && prefill.pickupDate >= today) {
      setPickupDate(prefill.pickupDate);
      setReturnDate(prefill.pickupDate);
    }
    setSuccessData(null);
    setSubmittedErrors({});
  }, [prefill, today]);

  const handleDurationChange = (nextDuration: RentalDuration) => {
    setDuration(nextDuration);
    const baseDate = pickupDate >= today ? pickupDate : today;

    if (nextDuration === '12 Hours') {
      setReturnDate(baseDate);
      setReturnTime('21:00');
    } else if (nextDuration === '24 Hours') {
      setReturnDate(addDaysToDateString(baseDate, 1));
      setReturnTime(pickupTime);
    } else if (nextDuration === '48 Hours') {
      setReturnDate(addDaysToDateString(baseDate, 2));
      setReturnTime(pickupTime);
    } else if (nextDuration === '5 Days') {
      setReturnDate(addDaysToDateString(baseDate, 5));
      setReturnTime(pickupTime);
    } else if (nextDuration === '1 Week') {
      setReturnDate(addDaysToDateString(baseDate, 7));
      setReturnTime(pickupTime);
    } else if (nextDuration === '1 Month') {
      setReturnDate(addDaysToDateString(baseDate, 30));
      setReturnTime(pickupTime);
    }
  };

  const toggleCar = (carId: string) => {
    setSelectedCars((prev) => {
      const copy = { ...prev };
      if (copy[carId]) {
        delete copy[carId];
      } else {
        copy[carId] = 1;
      }
      return copy;
    });
    setSubmittedErrors((prev) => {
      if (!prev.car) return prev;
      const copy = { ...prev };
      delete copy.car;
      return copy;
    });
  };

  const updateCarQty = (carId: string, delta: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedCars((prev) => {
      const current = prev[carId] || 0;
      const next = current + delta;
      const copy = { ...prev };
      if (next <= 0) {
        delete copy[carId];
      } else {
        copy[carId] = Math.min(next, 10);
      }
      return copy;
    });
    setSubmittedErrors((prev) => {
      if (!prev.car) return prev;
      const copy = { ...prev };
      delete copy.car;
      return copy;
    });
  };

  const selectedCarItems = useMemo<CarSelectionItem[]>(() => {
    const items: CarSelectionItem[] = [];
    for (const [id, qty] of Object.entries(selectedCars)) {
      if (qty > 0) {
        const car = getCarById(id);
        if (car) {
          items.push({ car, quantity: qty });
        }
      }
    }
    return items;
  }, [selectedCars]);

  const totalCarCount = useMemo(() => {
    return (
      selectedCarItems.reduce((sum, item) => sum + item.quantity, 0) +
      (includeOtherCar ? 1 : 0)
    );
  }, [selectedCarItems, includeOtherCar]);

  const rentalHours = useMemo(
    () => calculateRentalHours(pickupDate, pickupTime, returnDate, returnTime),
    [pickupDate, pickupTime, returnDate, returnTime]
  );

  const priceEstimate = useMemo(() => {
    return computeMultiCarPriceEstimate({
      vehicleType,
      selectedCars: selectedCarItems,
      hasOtherModel: includeOtherCar,
      duration,
      rentalHours,
    });
  }, [vehicleType, selectedCarItems, includeOtherCar, duration, rentalHours]);

  const resolvedVehicleModelLabel = useMemo(() => {
    const cleanCustom = sanitizeInput(customVehicleText, 100);
    if (vehicleType === 'Car') {
      const carNames: string[] = [];
      for (const item of selectedCarItems) {
        carNames.push(`${item.car.name}${item.quantity > 1 ? ` (×${item.quantity})` : ''}`);
      }
      if (includeOtherCar) {
        carNames.push(cleanCustom ? `Others (${cleanCustom})` : 'Others (Custom Car)');
      }
      if (carNames.length === 0) {
        return 'No car selected';
      }
      return `${carNames.join(', ')} [${totalCarCount} Car${totalCarCount > 1 ? 's' : ''} Total]`;
    }
    if (vehicleType === 'Bike') {
      return cleanCustom
        ? `Upcoming Bike Rental (${cleanCustom})`
        : 'Upcoming Self-Drive Bike Rental (General Enquiry)';
    }
    return cleanCustom ? `Others (${cleanCustom})` : 'Others (Custom Vehicle Enquiry)';
  }, [vehicleType, selectedCarItems, includeOtherCar, totalCarCount, customVehicleText]);

  const resolvedDurationLabel = useMemo(() => {
    const cleanCustomDur = sanitizeInput(customDurationText, 80);
    if (duration === 'Others' && cleanCustomDur) {
      return `Others (${cleanCustomDur})`;
    }
    return duration;
  }, [duration, customDurationText]);

  const submitWithChannel = (channel: 'WhatsApp' | 'Email' | 'Both') => {
    const nextErrors: Record<string, string> = {};
    const nameError = validateFullName(fullName);
    if (nameError) nextErrors.fullName = nameError;

    const phoneError = validateIndianMobile(mobile);
    if (phoneError) nextErrors.mobile = phoneError;

    if (vehicleType === 'Car' && selectedCarItems.length === 0 && !includeOtherCar) {
      nextErrors.car = 'Please select at least one car model.';
    }

    const scheduleErrors = validateSchedule(pickupDate, pickupTime, returnDate, returnTime);
    if (scheduleErrors.pickupError) nextErrors.pickup = scheduleErrors.pickupError;
    if (scheduleErrors.returnError) nextErrors.return = scheduleErrors.returnError;

    if (Object.keys(nextErrors).length > 0) {
      setSubmittedErrors(nextErrors);
      return;
    }

    setSubmittedErrors({});

    const message = buildBookingWhatsAppMessage({
      customerName: fullName,
      customerPhone: mobile,
      vehicleType,
      vehicleModel: resolvedVehicleModelLabel,
      rentalDuration: resolvedDurationLabel,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      estimatedPrice: priceEstimate.whatsappPriceValue,
      description,
    });

    const whatsappUrl = buildWhatsAppUrl(message);
    const emailSubject = `Self-Drive Booking Request: ${resolvedVehicleModelLabel} (${resolvedDurationLabel})`;
    const emailUrl = buildMailtoUrl(emailSubject, message);

    if (channel === 'WhatsApp') {
      triggerExternalWhatsApp(whatsappUrl);
    } else if (channel === 'Email') {
      triggerExternalEmail(emailUrl);
    } else {
      triggerExternalWhatsApp(whatsappUrl);
      triggerExternalEmail(emailUrl);
    }

    setSuccessData({ whatsappUrl, emailUrl, message, channel });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitWithChannel('WhatsApp');
  };

  if (successData) {
    return (
      <BookingSuccess
        whatsappUrl={successData.whatsappUrl}
        emailUrl={successData.emailUrl}
        summaryText={successData.message}
        channelLabel={successData.channel}
        onEdit={() => setSuccessData(null)}
        onClose={() => onClose?.()}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Step 1: Customer Details */}
      <section aria-labelledby="booking-step-1">
        <h3 id="booking-step-1" className="text-sm font-bold text-[#071D3A] uppercase tracking-wider mb-3">
          1. Customer Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="booking-full-name" className="block text-sm font-medium text-[#172337] mb-1.5">
              Full Name <span className="text-[#F36B16]">*</span>
            </label>
            <input
              id="booking-full-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              autoComplete="name"
              maxLength={80}
              required
              aria-invalid={Boolean(submittedErrors.fullName)}
              aria-describedby={submittedErrors.fullName ? 'err-full-name' : undefined}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF0] bg-white text-[#172337] text-sm focus:outline-none focus:border-[#F36B16] focus:ring-2 focus:ring-[#F36B16]/20"
            />
            {submittedErrors.fullName && (
              <p id="err-full-name" className="mt-1.5 text-xs font-medium text-red-600" role="alert">
                {submittedErrors.fullName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="booking-mobile" className="block text-sm font-medium text-[#172337] mb-1.5">
              Mobile Number <span className="text-[#F36B16]">*</span>
            </label>
            <input
              id="booking-mobile"
              type="tel"
              inputMode="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="10-digit mobile number"
              autoComplete="tel"
              maxLength={16}
              required
              aria-invalid={Boolean(submittedErrors.mobile)}
              aria-describedby={submittedErrors.mobile ? 'err-mobile' : undefined}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF0] bg-white text-[#172337] text-sm tabular-nums focus:outline-none focus:border-[#F36B16] focus:ring-2 focus:ring-[#F36B16]/20"
            />
            {submittedErrors.mobile && (
              <p id="err-mobile" className="mt-1.5 text-xs font-medium text-red-600" role="alert">
                {submittedErrors.mobile}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Step 2: Vehicle Type */}
      <section aria-labelledby="booking-step-2">
        <h3 id="booking-step-2" className="text-sm font-bold text-[#071D3A] uppercase tracking-wider mb-3">
          2. Vehicle Type
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setVehicleType('Car')}
            className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              vehicleType === 'Car'
                ? 'border-[#F36B16] bg-[#FFF3E9] text-[#071D3A]'
                : 'border-[#E5EAF0] bg-white text-[#172337] hover:bg-[#F5F7FA]'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                vehicleType === 'Car' ? 'bg-[#F36B16] text-white' : 'bg-[#F5F7FA] text-[#071D3A]'
              }`}
            >
              <Car className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <span className="block text-sm font-bold">Car</span>
              <span className="block text-xs text-[#697586] truncate">Available now</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setVehicleType('Bike')}
            className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              vehicleType === 'Bike'
                ? 'border-[#F36B16] bg-[#FFF3E9] text-[#071D3A]'
                : 'border-[#E5EAF0] bg-white text-[#172337] hover:bg-[#F5F7FA]'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                vehicleType === 'Bike' ? 'bg-[#F36B16] text-white' : 'bg-[#F5F7FA] text-[#071D3A]'
              }`}
            >
              <Bike className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <span className="block text-sm font-bold">Bike</span>
              <span className="block text-xs text-[#F36B16] font-medium truncate">Coming Soon</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setVehicleType('Others')}
            className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              vehicleType === 'Others'
                ? 'border-[#F36B16] bg-[#FFF3E9] text-[#071D3A]'
                : 'border-[#E5EAF0] bg-white text-[#172337] hover:bg-[#F5F7FA]'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                vehicleType === 'Others' ? 'bg-[#F36B16] text-white' : 'bg-[#F5F7FA] text-[#071D3A]'
              }`}
            >
              <Layers className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <span className="block text-sm font-bold">Others</span>
              <span className="block text-xs text-[#697586] truncate">Custom enquiry</span>
            </div>
          </button>
        </div>
      </section>

      {/* Step 3: Vehicle Model Selection (Supports Multiple Cars!) */}
      <section aria-labelledby="booking-step-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 id="booking-step-3" className="text-sm font-bold text-[#071D3A] uppercase tracking-wider">
              3. Select Vehicle Model{vehicleType === 'Car' ? 's' : ''}
            </h3>
            {vehicleType === 'Car' && (
              <p className="text-xs text-[#697586] mt-0.5">
                Select one or multiple cars. Perfect for family, wedding, or corporate trips.
              </p>
            )}
          </div>

          {vehicleType === 'Car' && totalCarCount > 0 && (
            <span className="inline-flex items-center gap-1.5 self-start sm:self-center px-3 py-1 rounded-full bg-[#F36B16]/15 border border-[#F36B16]/30 text-xs font-bold text-[#F36B16]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>
                {totalCarCount} {totalCarCount === 1 ? 'Car' : 'Cars'} Selected
              </span>
            </span>
          )}
        </div>

        {submittedErrors.car && (
          <p className="mb-3 text-xs font-medium text-red-600" role="alert">
            {submittedErrors.car}
          </p>
        )}

        {vehicleType === 'Car' ? (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CAR_MODELS.map((car) => {
                const isSelected = Boolean(selectedCars[car.id] && selectedCars[car.id] > 0);
                const quantity = selectedCars[car.id] || 0;
                const unitRate = duration === '12 Hours' ? car.price12h : car.price24h;
                const subtotal = unitRate * quantity;

                return (
                  <div
                    key={car.id}
                    onClick={() => toggleCar(car.id)}
                    className={`relative flex flex-col justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#F36B16] bg-[#FFF3E9] shadow-xs'
                        : 'border-[#E5EAF0] bg-white hover:bg-[#F5F7FA]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Checkbox badge on top of car image */}
                      <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-[#F5F7FA] shrink-0 border border-black/5">
                        <ResilientImage
                          src={car.image}
                          alt={car.name}
                          lazy={false}
                          className="w-full h-full object-cover"
                        />
                        {isSelected && (
                          <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-[#F36B16] text-white flex items-center justify-center shadow-md">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="block text-sm font-bold text-[#071D3A] truncate">
                            {car.name}
                          </span>
                          {isSelected && (
                            <span className="text-[10px] font-bold text-[#F36B16] bg-white px-2 py-0.5 rounded-md border border-[#F36B16]/20">
                              Selected
                            </span>
                          )}
                        </div>
                        <span className="block text-xs text-[#697586] tabular-nums mt-0.5">
                          12h: {formatINR(car.price12h)} · 24h: {formatINR(car.price24h)}
                        </span>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-1">
                          {car.shortNote}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Quantity Controls when selected */}
                    {isSelected && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 pt-2.5 border-t border-[#F36B16]/20 flex items-center justify-between gap-2"
                      >
                        <span className="text-xs font-semibold text-[#071D3A]">
                          Qty:
                        </span>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-white rounded-lg border border-[#E5EAF0] shadow-2xs overflow-hidden">
                            <button
                              type="button"
                              onClick={(e) => updateCarQty(car.id, -1, e)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-[#F5F7FA] text-[#071D3A] transition-colors cursor-pointer"
                              title="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-[#071D3A] tabular-nums">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => updateCarQty(car.id, 1, e)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-[#F5F7FA] text-[#071D3A] transition-colors cursor-pointer"
                              title="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {(duration === '12 Hours' || duration === '24 Hours') && (
                            <span className="text-xs font-bold text-[#F36B16] tabular-nums">
                              {formatINR(subtotal)}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Others Option for Cars */}
              <div
                onClick={() => setIncludeOtherCar((prev) => !prev)}
                className={`sm:col-span-2 flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  includeOtherCar
                    ? 'border-[#F36B16] bg-[#FFF3E9]'
                    : 'border-[#E5EAF0] bg-white hover:bg-[#F5F7FA]'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    includeOtherCar ? 'bg-[#F36B16] text-white' : 'bg-[#F5F7FA] text-[#071D3A]'
                  }`}
                >
                  <Layers className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="block text-sm font-bold text-[#071D3A]">
                      Others / Custom Additional Vehicle
                    </span>
                    {includeOtherCar && (
                      <span className="text-[10px] font-bold text-[#F36B16] bg-white px-2 py-0.5 rounded-md border border-[#F36B16]/20">
                        Added
                      </span>
                    )}
                  </div>
                  <span className="block text-xs text-[#697586]">
                    Need a 7-seater, Innova, luxury car, or special fleet? Check this to specify.
                  </span>
                </div>
              </div>
            </div>

            {includeOtherCar && (
              <div>
                <label htmlFor="booking-custom-car" className="block text-xs font-medium text-[#697586] mb-1">
                  Specify Preferred Car / Custom Vehicle Requirement
                </label>
                <input
                  id="booking-custom-car"
                  type="text"
                  value={customVehicleText}
                  onChange={(e) => setCustomVehicleText(e.target.value)}
                  placeholder="e.g. Innova Crysta, Scorpio, or 2 additional hatchbacks..."
                  maxLength={100}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF0] bg-white text-sm text-[#172337] focus:outline-none focus:border-[#F36B16]"
                />
              </div>
            )}
          </div>
        ) : vehicleType === 'Bike' ? (
          <div className="space-y-3">
            <div className="rounded-xl border border-[#F36B16]/40 bg-[#FFF3E9] p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#F36B16] shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-sm text-[#172337]">
                <p className="font-semibold text-[#071D3A]">
                  Self-drive bike rentals are coming soon.
                </p>
                <p className="mt-1 text-xs text-[#697586] leading-relaxed">
                  This service has not launched yet. Submit your details below to send a general bike rental interest enquiry via WhatsApp or Email.
                </p>
              </div>
            </div>
            <div>
              <label htmlFor="booking-custom-bike" className="block text-xs font-medium text-[#697586] mb-1">
                Others / Enquiry Note for Bike Rental (Optional)
              </label>
              <input
                id="booking-custom-bike"
                type="text"
                value={customVehicleText}
                onChange={(e) => setCustomVehicleText(e.target.value)}
                placeholder="Optional note or preferred two-wheeler category..."
                maxLength={100}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF0] bg-white text-sm text-[#172337] focus:outline-none focus:border-[#F36B16]"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <label htmlFor="booking-custom-other" className="block text-xs font-medium text-[#697586]">
              Specify Vehicle / Custom Requirement (Optional)
            </label>
            <input
              id="booking-custom-other"
              type="text"
              value={customVehicleText}
              onChange={(e) => setCustomVehicleText(e.target.value)}
              placeholder="Describe the vehicle or custom rental requirement..."
              maxLength={100}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF0] bg-white text-sm text-[#172337] focus:outline-none focus:border-[#F36B16]"
            />
          </div>
        )}
      </section>

      {/* Step 4: Rental Duration */}
      <section aria-labelledby="booking-step-4">
        <h3 id="booking-step-4" className="text-sm font-bold text-[#071D3A] uppercase tracking-wider mb-3">
          4. Rental Duration Package
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {RENTAL_DURATIONS.map((pkg) => {
            const active = duration === pkg;
            let pkgSubtext = 'On Enquiry';
            if (vehicleType === 'Bike') {
              pkgSubtext = 'Coming Soon';
            } else if (pkg === '12 Hours') {
              pkgSubtext = 'Preset Rate';
            } else if (pkg === '24 Hours') {
              pkgSubtext = 'Preset Rate';
            }

            return (
              <button
                key={pkg}
                type="button"
                onClick={() => handleDurationChange(pkg)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  active
                    ? 'border-[#F36B16] bg-[#FFF3E9] text-[#071D3A]'
                    : 'border-[#E5EAF0] bg-white text-[#172337] hover:bg-[#F5F7FA]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="block text-sm font-bold">{pkg}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-[#F36B16]" />}
                </div>
                <span className="block text-xs text-[#697586] mt-0.5">{pkgSubtext}</span>
              </button>
            );
          })}
        </div>

        {duration === 'Others' && (
          <div className="mt-3">
            <label htmlFor="booking-custom-duration" className="block text-xs font-medium text-[#697586] mb-1">
              Specify Custom Duration / Trip Dates
            </label>
            <input
              id="booking-custom-duration"
              type="text"
              value={customDurationText}
              onChange={(e) => setCustomDurationText(e.target.value)}
              placeholder="e.g., 3 days, 10 days, 2 months..."
              maxLength={80}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF0] bg-white text-sm text-[#172337] focus:outline-none focus:border-[#F36B16]"
            />
          </div>
        )}
      </section>

      {/* Step 5: Pickup and Return Schedule */}
      <section aria-labelledby="booking-step-5">
        <h3 id="booking-step-5" className="text-sm font-bold text-[#071D3A] uppercase tracking-wider mb-3">
          5. Pickup &amp; Return Schedule
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-[#697586] mb-2">
              Pickup
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="booking-pickup-date" className="sr-only">
                  Pickup Date
                </label>
                <div className="relative">
                  <input
                    id="booking-pickup-date"
                    type="date"
                    min={today}
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    aria-invalid={Boolean(submittedErrors.pickup)}
                    aria-describedby={submittedErrors.pickup ? 'err-pickup' : undefined}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E5EAF0] bg-white text-xs sm:text-sm text-[#172337] focus:outline-none focus:border-[#F36B16]"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="booking-pickup-time" className="sr-only">
                  Pickup Time
                </label>
                <div className="relative">
                  <input
                    id="booking-pickup-time"
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E5EAF0] bg-white text-xs sm:text-sm text-[#172337] focus:outline-none focus:border-[#F36B16]"
                  />
                  <Clock className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>
            </div>
            {submittedErrors.pickup && (
              <p id="err-pickup" className="mt-1.5 text-xs font-medium text-red-600" role="alert">
                {submittedErrors.pickup}
              </p>
            )}
          </div>

          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-[#697586] mb-2">
              Return
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="booking-return-date" className="sr-only">
                  Return Date
                </label>
                <div className="relative">
                  <input
                    id="booking-return-date"
                    type="date"
                    min={pickupDate || today}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    aria-invalid={Boolean(submittedErrors.return)}
                    aria-describedby={submittedErrors.return ? 'err-return' : undefined}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E5EAF0] bg-white text-xs sm:text-sm text-[#172337] focus:outline-none focus:border-[#F36B16]"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="booking-return-time" className="sr-only">
                  Return Time
                </label>
                <div className="relative">
                  <input
                    id="booking-return-time"
                    type="time"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E5EAF0] bg-white text-xs sm:text-sm text-[#172337] focus:outline-none focus:border-[#F36B16]"
                  />
                  <Clock className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>
            </div>
            {submittedErrors.return && (
              <p id="err-return" className="mt-1.5 text-xs font-medium text-red-600" role="alert">
                {submittedErrors.return}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Step 6: Optional Description Box */}
      <section aria-labelledby="booking-step-6">
        <label htmlFor="booking-description" id="booking-step-6" className="block text-sm font-bold text-[#071D3A] uppercase tracking-wider mb-2">
          6. Description / Notes <span className="text-xs font-normal normal-case text-[#697586]">(Optional)</span>
        </label>
        <textarea
          id="booking-description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional: Add pickup area in Rourkela, trip purpose, or any special requests..."
          maxLength={350}
          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF0] bg-white text-[#172337] text-sm focus:outline-none focus:border-[#F36B16] focus:ring-2 focus:ring-[#F36B16]/20"
        />
      </section>

      {/* Required Documents Checklist Reminder */}
      <DocumentChecklist variant="compact" className="my-2" />

      {/* Step 7: Live Price Estimate & Booking Summary */}
      <section aria-labelledby="booking-summary-heading" className="rounded-2xl bg-[#071D3A] text-white p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/15">
          <div>
            <div className="flex items-center gap-2">
              <h3 id="booking-summary-heading" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Estimated Price
              </h3>
              {vehicleType === 'Car' && totalCarCount > 1 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F36B16]/20 text-[#F36B16] border border-[#F36B16]/40">
                  {totalCarCount} Cars Total
                </span>
              )}
            </div>
            <p className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#F36B16] tabular-nums">
              {priceEstimate.displayPrice}
            </p>
          </div>
          <span className="text-xs font-semibold text-white/90 bg-white/10 px-3 py-1.5 rounded-lg self-start sm:self-center">
            Prices are negotiable
          </span>
        </div>

        {/* Multi-Car Itemized Price Breakdown */}
        {priceEstimate.breakdown.length > 1 && (
          <div className="mt-3.5 pt-3 border-b border-white/15 pb-3">
            <span className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Combined Vehicle Breakdown ({duration}):
            </span>
            <div className="space-y-1.5 bg-white/5 rounded-xl p-3 border border-white/10">
              {priceEstimate.breakdown.map((item) => (
                <div key={item.carId} className="flex items-center justify-between text-xs">
                  <span className="text-slate-200">
                    <span className="font-semibold text-white">{item.carName}</span>
                    <span className="text-slate-400 ml-1.5">× {item.quantity}</span>
                  </span>
                  <span className="font-semibold text-white tabular-nums">
                    {formatINR(item.total)}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-white/10">
                <span className="text-slate-300">Total Combined Estimate:</span>
                <span className="text-[#F36B16] text-sm tabular-nums">
                  {priceEstimate.displayPrice}
                </span>
              </div>
            </div>
          </div>
        )}

        <p className="mt-3 text-xs text-slate-300 leading-relaxed">
          {priceEstimate.helperText}
        </p>

        <dl className="mt-4 pt-4 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5 text-xs">
          <div>
            <dt className="text-slate-400">Customer</dt>
            <dd className="font-semibold text-white truncate">
              {fullName.trim() || 'Not entered'}
            </dd>
          </div>
          <div>
            <dt className="text-slate-400">Phone</dt>
            <dd className="font-semibold text-white tabular-nums truncate">
              {mobile.trim() ? formatIndianMobileDisplay(mobile) : 'Not entered'}
            </dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="text-slate-400">Vehicle(s)</dt>
            <dd className="font-semibold text-white break-words">
              {resolvedVehicleModelLabel}
            </dd>
          </div>
          <div>
            <dt className="text-slate-400">Package</dt>
            <dd className="font-semibold text-white truncate">{resolvedDurationLabel}</dd>
          </div>
          <div>
            <dt className="text-slate-400">Pickup</dt>
            <dd className="font-semibold text-white tabular-nums">
              {formatIndianDate(pickupDate)} · {formatDisplayTime(pickupTime)}
            </dd>
          </div>
          <div>
            <dt className="text-slate-400">Return</dt>
            <dd className="font-semibold text-white tabular-nums">
              {formatIndianDate(returnDate)} · {formatDisplayTime(returnTime)}
            </dd>
          </div>
          {description.trim() && (
            <div className="col-span-2 sm:col-span-3">
              <dt className="text-slate-400">Notes</dt>
              <dd className="font-semibold text-white break-words">
                {sanitizeInput(description, 160)}
              </dd>
            </div>
          )}
        </dl>
      </section>

      {/* Step 8: Send via WhatsApp, Email, or Both */}
      <div className="space-y-3 pt-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm shadow-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#071D3A]"
          >
            <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>Send on WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => submitWithChannel('Email')}
            className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#F36B16] hover:bg-[#d95b0e] text-white font-semibold text-sm shadow-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#071D3A]"
          >
            <Mail className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>Send via Email</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={() => submitWithChannel('Both')}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#071D3A] hover:bg-[#0B2345] text-white font-semibold text-sm transition-colors cursor-pointer"
          >
            <span>Send to Both (WhatsApp &amp; {BRAND_CONFIG.email})</span>
          </button>

          {showMaybeLater && onMaybeLater && (
            <button
              type="button"
              onClick={onMaybeLater}
              className="py-3 px-5 rounded-xl border border-[#E5EAF0] text-[#697586] hover:text-[#071D3A] hover:bg-[#F5F7FA] font-semibold text-sm transition-colors cursor-pointer"
            >
              Maybe Later
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
