import type { CarModel, RentalDuration, VehicleType } from '../data/vehicles';
import { formatINR } from '../data/vehicles';

/**
 * Strips HTML tags and control characters from user input.
 */
export function sanitizeInput(value: string, maxLength = 350): string {
  return value
    .replace(/[<>]/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

/**
 * Validates customer full name (at least 2 readable letters).
 */
export function validateFullName(name: string): string | null {
  const cleaned = sanitizeInput(name, 80);
  if (!cleaned) {
    return 'Please enter your full name.';
  }
  if (cleaned.length < 2) {
    return 'Name must be at least 2 characters.';
  }
  if (!/[a-zA-Z]/.test(cleaned)) {
    return 'Please enter a valid name.';
  }
  return null;
}

/**
 * Normalizes and validates an Indian 10-digit mobile number (starting with 6-9).
 */
export function normalizeIndianMobile(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return digits;
}

export function validateIndianMobile(input: string): string | null {
  const normalized = normalizeIndianMobile(input);
  if (!normalized) {
    return 'Please enter your mobile number.';
  }
  if (!/^[6-9]\d{9}$/.test(normalized)) {
    return 'Enter a valid 10-digit Indian mobile number (starting with 6–9).';
  }
  return null;
}

export function formatIndianMobileDisplay(input: string): string {
  const normalized = normalizeIndianMobile(input);
  if (/^[6-9]\d{9}$/.test(normalized)) {
    return `+91 ${normalized.slice(0, 5)} ${normalized.slice(5)}`;
  }
  return sanitizeInput(input, 20);
}

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getTomorrowDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function addDaysToDateString(dateStr: string, days: number): string {
  const base = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(base.getTime())) return dateStr;
  base.setDate(base.getDate() + days);
  const yr = base.getFullYear();
  const mo = String(base.getMonth() + 1).padStart(2, '0');
  const dy = String(base.getDate()).padStart(2, '0');
  return `${yr}-${mo}-${dy}`;
}

/**
 * Formats YYYY-MM-DD as DD/MM/YYYY (Indian date format).
 */
export function formatIndianDate(dateStr: string): string {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr || 'Not specified';
  }
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

/**
 * Formats HH:MM (24h) as 12-hour readable time (e.g., 10:00 AM).
 */
export function formatDisplayTime(timeStr: string): string {
  if (!timeStr || !/^\d{2}:\d{2}$/.test(timeStr)) {
    return timeStr || 'Not specified';
  }
  const [hourRaw, minute] = timeStr.split(':');
  const hour = Number(hourRaw);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${String(displayHour).padStart(2, '0')}:${minute} ${period}`;
}

export function parseLocalDateTime(dateStr: string, timeStr: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr) || !/^\d{2}:\d{2}$/.test(timeStr)) {
    return null;
  }
  const parsed = new Date(`${dateStr}T${timeStr}:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function calculateRentalHours(
  pickupDate: string,
  pickupTime: string,
  returnDate: string,
  returnTime: string
): number | null {
  const start = parseLocalDateTime(pickupDate, pickupTime);
  const end = parseLocalDateTime(returnDate, returnTime);
  if (!start || !end) return null;
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
}

export function validateSchedule(
  pickupDate: string,
  pickupTime: string,
  returnDate: string,
  returnTime: string
): { pickupError?: string; returnError?: string } {
  const errors: { pickupError?: string; returnError?: string } = {};
  const today = getTodayDateString();

  if (!pickupDate) {
    errors.pickupError = 'Select a pickup date.';
  } else if (pickupDate < today) {
    errors.pickupError = 'Pickup date cannot be in the past.';
  }

  if (!pickupTime) {
    errors.pickupError = errors.pickupError || 'Select a pickup time.';
  }

  if (!returnDate) {
    errors.returnError = 'Select a return date.';
  } else if (pickupDate && returnDate < pickupDate) {
    errors.returnError = 'Return date must be on or after the pickup date.';
  }

  if (!returnTime) {
    errors.returnError = errors.returnError || 'Select a return time.';
  }

  const hours = calculateRentalHours(pickupDate, pickupTime, returnDate, returnTime);
  if (!errors.pickupError && !errors.returnError && hours !== null) {
    const start = parseLocalDateTime(pickupDate, pickupTime);
    if (start && start.getTime() < Date.now() - 5 * 60 * 1000) {
      errors.pickupError = 'Pickup time cannot be in the past.';
    }
    if (hours <= 0) {
      errors.returnError = 'Return date and time must be after pickup.';
    }
  }

  return errors;
}

export interface PriceEstimateResult {
  displayPrice: string;
  isExactPackage: boolean;
  exceedsPackage: boolean;
  helperText: string;
  whatsappPriceValue: string;
}

/**
 * Strict pricing calculation:
 * - Never invents multi-day, 48h, 5-day, 1-week, 1-month, or "Others" rates.
 * - Only 12 Hours and 24 Hours for verified Car models have preset base rates.
 * - Extended durations, custom "Others" models/types, and bikes return non-fabricated enquiry guidance.
 */
export function computePriceEstimate(params: {
  vehicleType: VehicleType;
  car?: CarModel;
  isOtherModel?: boolean;
  duration: RentalDuration;
  rentalHours: number | null;
}): PriceEstimateResult {
  const { vehicleType, car, isOtherModel = false, duration, rentalHours } = params;

  if (vehicleType === 'Bike') {
    return {
      displayPrice: 'Coming Soon',
      isExactPackage: false,
      exceedsPackage: false,
      helperText: 'Bike rental pricing will be announced soon.',
      whatsappPriceValue: 'Final Price on Enquiry (Bike rental coming soon)',
    };
  }

  if (vehicleType === 'Others' || isOtherModel) {
    return {
      displayPrice: 'Final price on enquiry',
      isExactPackage: false,
      exceedsPackage: false,
      helperText:
        'Custom vehicle requests are quoted directly. Prices are negotiable — our team will confirm availability and final price on WhatsApp.',
      whatsappPriceValue: 'Final Price on Enquiry',
    };
  }

  if (!car) {
    return {
      displayPrice: 'Select a vehicle',
      isExactPackage: false,
      exceedsPackage: false,
      helperText: 'Choose a car model to view its package rate.',
      whatsappPriceValue: 'Final Price on Enquiry',
    };
  }

  if (duration !== '12 Hours' && duration !== '24 Hours') {
    return {
      displayPrice: 'Final price on enquiry',
      isExactPackage: false,
      exceedsPackage: false,
      helperText: `Negotiable ${duration} rental rates are confirmed directly on enquiry. Send your request on WhatsApp for the best quote.`,
      whatsappPriceValue: `Final Price on Enquiry (${duration})`,
    };
  }

  const packageHours = duration === '12 Hours' ? 12 : 24;
  const packageAmount = duration === '12 Hours' ? car.price12h : car.price24h;

  if (rentalHours !== null && rentalHours > packageHours) {
    const roundedHours = Math.ceil(rentalHours);
    return {
      displayPrice: 'Final price on enquiry',
      isExactPackage: false,
      exceedsPackage: true,
      helperText: `Selected schedule (~${roundedHours} hrs) exceeds the ${duration} package. Prices are negotiable — our team will confirm the final amount on enquiry.`,
      whatsappPriceValue: 'Final Price on Enquiry',
    };
  }

  const formatted = formatINR(packageAmount);
  return {
    displayPrice: formatted,
    isExactPackage: true,
    exceedsPackage: false,
    helperText: `Standard ${duration} package rate. Prices are negotiable — final amount will be confirmed by our team.`,
    whatsappPriceValue: `${formatted} (${duration} package, negotiable)`,
  };
}

export interface CarSelectionItem {
  car: CarModel;
  quantity: number;
}

export interface MultiCarPriceEstimateResult {
  displayPrice: string;
  totalAmount: number | null;
  breakdown: Array<{
    carId: string;
    carName: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  isExactPackage: boolean;
  exceedsPackage: boolean;
  helperText: string;
  whatsappPriceValue: string;
  totalCarsCount: number;
}

/**
 * Calculates combined price estimate for multiple selected cars.
 */
export function computeMultiCarPriceEstimate(params: {
  vehicleType: VehicleType;
  selectedCars: CarSelectionItem[];
  hasOtherModel?: boolean;
  duration: RentalDuration;
  rentalHours: number | null;
}): MultiCarPriceEstimateResult {
  const { vehicleType, selectedCars, hasOtherModel = false, duration, rentalHours } = params;

  if (vehicleType === 'Bike') {
    return {
      displayPrice: 'Coming Soon',
      totalAmount: null,
      breakdown: [],
      isExactPackage: false,
      exceedsPackage: false,
      helperText: 'Bike rental pricing will be announced soon.',
      whatsappPriceValue: 'Final Price on Enquiry (Bike rental coming soon)',
      totalCarsCount: 0,
    };
  }

  if (vehicleType === 'Others') {
    return {
      displayPrice: 'Final price on enquiry',
      totalAmount: null,
      breakdown: [],
      isExactPackage: false,
      exceedsPackage: false,
      helperText:
        'Custom vehicle requests are quoted directly. Prices are negotiable — our team will confirm availability and final price on WhatsApp.',
      whatsappPriceValue: 'Final Price on Enquiry',
      totalCarsCount: 0,
    };
  }

  const validSelections = selectedCars.filter((item) => item.quantity > 0);
  const totalCarsCount = validSelections.reduce((sum, item) => sum + item.quantity, 0);

  if (totalCarsCount === 0) {
    if (hasOtherModel) {
      return {
        displayPrice: 'Final price on enquiry',
        totalAmount: null,
        breakdown: [],
        isExactPackage: false,
        exceedsPackage: false,
        helperText: 'Custom vehicle requests are quoted directly on WhatsApp.',
        whatsappPriceValue: 'Final Price on Enquiry',
        totalCarsCount: 1,
      };
    }
    return {
      displayPrice: 'Select at least 1 car',
      totalAmount: null,
      breakdown: [],
      isExactPackage: false,
      exceedsPackage: false,
      helperText: 'Choose one or more car models to view the combined package rate.',
      whatsappPriceValue: 'Final Price on Enquiry',
      totalCarsCount: 0,
    };
  }

  if (duration !== '12 Hours' && duration !== '24 Hours') {
    return {
      displayPrice: 'Final price on enquiry',
      totalAmount: null,
      breakdown: [],
      isExactPackage: false,
      exceedsPackage: false,
      helperText: `Negotiable ${duration} rental package for ${totalCarsCount} car${
        totalCarsCount > 1 ? 's' : ''
      }. Send your request on WhatsApp for the best multi-vehicle quote.`,
      whatsappPriceValue: `Final Price on Enquiry (${duration} package for ${totalCarsCount} car${
        totalCarsCount > 1 ? 's' : ''
      })`,
      totalCarsCount,
    };
  }

  const packageHours = duration === '12 Hours' ? 12 : 24;

  if (rentalHours !== null && rentalHours > packageHours) {
    const roundedHours = Math.ceil(rentalHours);
    return {
      displayPrice: 'Final price on enquiry',
      totalAmount: null,
      breakdown: [],
      isExactPackage: false,
      exceedsPackage: true,
      helperText: `Selected schedule (~${roundedHours} hrs) exceeds the ${duration} package. Prices are negotiable — our team will confirm the final amount on enquiry.`,
      whatsappPriceValue: 'Final Price on Enquiry',
      totalCarsCount,
    };
  }

  let totalAmount = 0;
  const breakdown: MultiCarPriceEstimateResult['breakdown'] = [];

  for (const item of validSelections) {
    const unitPrice = duration === '12 Hours' ? item.car.price12h : item.car.price24h;
    const subtotal = unitPrice * item.quantity;
    totalAmount += subtotal;
    breakdown.push({
      carId: item.car.id,
      carName: item.car.name,
      quantity: item.quantity,
      unitPrice,
      total: subtotal,
    });
  }

  const formattedTotal = formatINR(totalAmount);

  if (hasOtherModel) {
    return {
      displayPrice: `${formattedTotal} + Custom`,
      totalAmount,
      breakdown,
      isExactPackage: true,
      exceedsPackage: false,
      helperText: `Package rate for ${totalCarsCount} selected car${
        totalCarsCount > 1 ? 's' : ''
      } plus custom car request. Prices are negotiable on WhatsApp.`,
      whatsappPriceValue: `${formattedTotal} + Custom Car (${duration} package for ${totalCarsCount} car${
        totalCarsCount > 1 ? 's' : ''
      }, negotiable)`,
      totalCarsCount: totalCarsCount + 1,
    };
  }

  return {
    displayPrice: formattedTotal,
    totalAmount,
    breakdown,
    isExactPackage: true,
    exceedsPackage: false,
    helperText: `Combined ${duration} package rate for ${totalCarsCount} car${
      totalCarsCount > 1 ? 's' : ''
    }. Prices are negotiable — final amount will be confirmed by our team.`,
    whatsappPriceValue: `${formattedTotal} (${duration} package for ${totalCarsCount} car${
      totalCarsCount > 1 ? 's' : ''
    }, negotiable)`,
    totalCarsCount,
  };
}
