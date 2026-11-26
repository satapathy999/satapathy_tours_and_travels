import { BRAND_CONFIG, type VehicleType } from '../data/vehicles';
import {
  formatDisplayTime,
  formatIndianDate,
  formatIndianMobileDisplay,
  sanitizeInput,
} from './validation';

export interface BookingWhatsAppPayload {
  customerName: string;
  customerPhone: string;
  vehicleType: VehicleType;
  vehicleModel: string;
  rentalDuration: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  estimatedPrice: string;
  description?: string;
}

export function buildBookingWhatsAppMessage(payload: BookingWhatsAppPayload): string {
  const safeName = sanitizeInput(payload.customerName, 80);
  const safePhone = formatIndianMobileDisplay(payload.customerPhone);
  const safeModel = sanitizeInput(payload.vehicleModel, 250);
  const safeDuration = sanitizeInput(payload.rentalDuration, 80);
  const safeDescription = payload.description ? sanitizeInput(payload.description, 350) : '';

  const lines = [
    'Hello Satapathy Tour and Travels!',
    '',
    'I would like to submit a self-drive vehicle booking request.',
    '',
    'CUSTOMER DETAILS',
    '',
    `Name: ${safeName}`,
    '',
    `Mobile: ${safePhone}`,
    '',
    'BOOKING DETAILS',
    '',
    `Vehicle Type: ${payload.vehicleType}`,
    '',
    `Vehicle Model: ${safeModel}`,
    '',
    `Rental Duration: ${safeDuration}`,
    '',
    `Pickup Date: ${formatIndianDate(payload.pickupDate)}`,
    '',
    `Pickup Time: ${formatDisplayTime(payload.pickupTime)}`,
    '',
    `Return Date: ${formatIndianDate(payload.returnDate)}`,
    '',
    `Return Time: ${formatDisplayTime(payload.returnTime)}`,
    '',
    `Estimated Price: ${payload.estimatedPrice}`,
  ];

  if (safeDescription) {
    lines.push('', `Description / Notes: ${safeDescription}`);
  }

  lines.push(
    '',
    'Please confirm vehicle availability and the final negotiable rental price.',
    '',
    'Thank you!'
  );

  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  return `${BRAND_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(subject: string, body: string): string {
  return `mailto:${BRAND_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildBikeEnquiryMessage(
  customName?: string,
  customPhone?: string,
  note?: string
): string {
  if (!customName && !customPhone && !note) {
    return BRAND_CONFIG.bikeComingSoonMessage;
  }
  return [
    BRAND_CONFIG.bikeComingSoonMessage,
    '',
    customName ? `Name: ${sanitizeInput(customName, 80)}` : '',
    customPhone ? `Mobile: ${formatIndianMobileDisplay(customPhone)}` : '',
    note ? `Note: ${sanitizeInput(note, 250)}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

export function buildBikeEnquiryWhatsAppUrl(
  customName?: string,
  customPhone?: string,
  note?: string
): string {
  return buildWhatsAppUrl(buildBikeEnquiryMessage(customName, customPhone, note));
}

export function buildBikeEnquiryEmailUrl(
  customName?: string,
  customPhone?: string,
  note?: string
): string {
  return buildMailtoUrl(
    'Self-Drive Bike Rental Enquiry – Satapathy Tour and Travels',
    buildBikeEnquiryMessage(customName, customPhone, note)
  );
}

export function buildContactEnquiryMessage(params: {
  fullName: string;
  mobile: string;
  vehicleType: VehicleType;
  vehicleModel: string;
  message: string;
}): string {
  return [
    'Hello Satapathy Tour and Travels!',
    '',
    'I am reaching out via your website contact form.',
    '',
    `Name: ${sanitizeInput(params.fullName, 80)}`,
    `Mobile: ${formatIndianMobileDisplay(params.mobile)}`,
    `Vehicle Type: ${params.vehicleType}`,
    `Vehicle Model: ${sanitizeInput(params.vehicleModel, 100)}`,
    `Message: ${sanitizeInput(params.message, 400)}`,
  ].join('\n');
}

export function buildContactWhatsAppUrl(params: {
  fullName: string;
  mobile: string;
  vehicleType: VehicleType;
  vehicleModel: string;
  message: string;
}): string {
  return buildWhatsAppUrl(buildContactEnquiryMessage(params));
}

export function buildContactEmailUrl(params: {
  fullName: string;
  mobile: string;
  vehicleType: VehicleType;
  vehicleModel: string;
  message: string;
}): string {
  return buildMailtoUrl(
    `Rental Enquiry (${params.vehicleType} - ${sanitizeInput(params.vehicleModel, 60)})`,
    buildContactEnquiryMessage(params)
  );
}

export function triggerExternalWhatsApp(url: string): void {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

export function triggerExternalEmail(url: string): void {
  const anchor = document.createElement('a');
  anchor.href = url;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
