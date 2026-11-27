export type VehicleType = 'Car' | 'Bike' | 'Others';
export type RentalDuration =
  | '12 Hours'
  | '24 Hours'
  | '48 Hours'
  | '5 Days'
  | '1 Week'
  | '1 Month'
  | 'Others';

export interface CarModel {
  id: string;
  name: string;
  price12h: number;
  price24h: number;
  image: string;
  alt: string;
  shortNote: string;
}

export const BRAND_CONFIG = {
  name: 'Satapathy Tour and Travel',
  legalName: 'Satapathy Tour and Travels',
  websiteUrl: 'https://www.satapathytravels.com',
  tagline: 'SELF-DRIVE BIKE AND CAR RENTALS',
  locationSummary: 'All Over Rourkela, Odisha',
  locationDescription:
    'Service and convenient self-drive pickup available all over Rourkela. Connect with us on phone, WhatsApp, or email to coordinate your exact pickup point in Rourkela.',
  phoneDisplay: '+91 78548 88381',
  phoneHref: 'tel:+917854888381',
  whatsappNumber: '917854888381',
  whatsappBaseUrl: 'https://wa.me/917854888381',
  email: 'rklselfdrivecarz@gmail.com',
  emailHref: 'mailto:rklselfdrivecarz@gmail.com',
  instagramHandle: 'rklselfdrivecarz',
  instagramUrl: 'https://www.instagram.com/rklselfdrivecarz/',
  googleMapsUrl: 'https://maps.app.goo.gl/GquJAT9Kn2v1MoZb9',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=22.2453963,84.8094872+(SATAPATHY+TOURS+AND+TRAVELS)&t=&z=16&ie=UTF8&iwloc=&output=embed',
  logoPath: '/assets/aistudio/WhatsApp_Image_2026-11-15_at_6.00.56_PM_1d6810db.jpeg',
  heroImage: '/src/assets/images/hero_automotive_rental_1795091053905.jpg',
  bikeHeroImage: '/src/assets/images/bike_coming_soon_1795091053999.jpg',
  aboutImage: '/src/assets/images/about_automotive_drive_1795091054333.jpg',
  founder: {
    name: 'Ayush Satapathy',
    title: 'Founder & CEO',
    punchline: 'Drive Your Own Journey — We Deliver the Keys to Your Freedom.',
    punchlineHindi: 'Apna Safar, Apni Manzil — Freedom in Every Mile',
    bio: 'Passionate about seamless road trips and customer trust, Ayush Satapathy established Satapathy Tour and Travels to bring modern, transparent, and flexible self-drive car rental options to travellers across Rourkela and Odisha.',
    officeImage: '/src/assets/images/founder_ayush_satapathy_office.jpg',
    tharImage: '/src/assets/images/founder_ayush_satapathy_thar.jpg',
  },
  negotiableNotice: 'All prices are negotiable. Contact us for the best available rental price.',
  bikeComingSoonMessage:
    'Hello Satapathy Tour and Travels, I am interested in your upcoming self-drive bike and scooter rental service in Rourkela. Please let me know when it becomes available.',
} as const;

export interface TourPackage {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  destination: string;
  description: string;
  places: string[];
  recommendedVehicles: string;
  highlights: string[];
}

export const ODISHA_TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'khandadhar-mandira-falls',
    name: 'Khandadhar Falls & Mandira Dam Scenic Tour',
    tagline: 'Waterfalls, Dam Reservoir & Nature Picnic from Rourkela',
    duration: '1 Day (Full Day Excursion)',
    destination: 'Sundargarh & Rourkela Environs',
    description:
      'Experience the pristine majesty of Khandadhar Waterfall—the 2nd highest fall in Odisha—paired with the serene waters of Mandira Dam and historic Vedvyas Sangam temple.',
    places: [
      'Khandadhar Waterfall (Bonaigarh)',
      'Mandira Dam & Boating Point',
      'Darjeeng Scenic Picnic Spot',
      'Vedvyas Temple (Confluence of Shankha & Koel rivers)',
    ],
    recommendedVehicles: 'Mahindra Scorpio SUV / Maruti Suzuki Fronx / Baleno',
    highlights: [
      'Pickup & drop anywhere in Rourkela',
      'Flexible departure time suited to your family or group',
      'Choose self-drive or experienced driver options',
      'Stunning photography spots amidst forested hills',
    ],
  },
  {
    id: 'debrigarh-hirakud-eco-tour',
    name: 'Debrigarh Wildlife & Hirakud Dam Eco-Tour',
    tagline: 'Wildlife Safari, Earthen Dam & Maa Samaleswari Temple',
    duration: '2 Days / 1 Night',
    destination: 'Sambalpur & Bargarh District',
    description:
      'A thrilling eco-tourism gateway from Rourkela exploring the mighty Hirakud Reservoir, jungle safari at Debrigarh Wildlife Sanctuary, and sacred blessing at Maa Samaleswari Temple.',
    places: [
      'Hirakud Dam & Gandhi Minar Watchtower',
      'Debrigarh Wildlife Sanctuary Safari',
      'Maa Samaleswari Temple (Sambalpur)',
      'Zero Point Scenic Reservoir Drive',
    ],
    recommendedVehicles: 'Mahindra Scorpio 7-Seater / Swift Dzire / Honda Amaze',
    highlights: [
      'Spot Indian bison (Gaur), leopards, spotted deer & migratory birds',
      'Scenic highway drive along Biju Expressway',
      'Safe, reliable outstation travel with family comfort',
      'Negotiable package rates including toll guidance',
    ],
  },
  {
    id: 'similipal-tiger-reserve-tour',
    name: 'Similipal Biosphere Reserve & Wilderness Safari',
    tagline: 'UNESCO Biosphere, Jungle Waterfalls & Forest Retreat',
    duration: '3 Days / 2 Nights',
    destination: 'Mayurbhanj District, Odisha',
    description:
      'Immerse in the untamed beauty of Similipal National Park. Marvel at Barehipani & Joranda waterfalls, dense sal forests, and unique biodiversity in an unforgettable SUV road trip from Rourkela.',
    places: [
      'Similipal National Park Eco-Tourism Gate',
      'Barehipani Two-Tier Waterfall',
      'Joranda Waterfall',
      'Chahala Wildlife Viewing Point',
      'Khiching Kichakeswari Temple',
    ],
    recommendedVehicles: 'Mahindra Scorpio 4x4 / High Ground Clearance SUV',
    highlights: [
      'Ideal for nature enthusiasts, trekkers & adventure groups',
      'High ground clearance SUV packages with rugged performance',
      'Doorstep handover in Rourkela with full vehicle maintenance check',
    ],
  },
  {
    id: 'golden-triangle-odisha-tour',
    name: 'Puri, Konark & Chilika Coastal Heritage Tour',
    tagline: 'Jagannath Dham, Sun Temple & Asia’s Largest Lagoon',
    duration: '4 Days / 3 Nights',
    destination: 'Bhubaneswar, Puri & Konark Coastal Circuit',
    description:
      'The quintessential Odisha road trip from Rourkela to the holy coast. Visit Sri Jagannath Temple in Puri, the UNESCO World Heritage Sun Temple in Konark, Marine Drive beach cruising, and Chilika Lake dolphin boating.',
    places: [
      'Puri Jagannath Temple & Golden Beach',
      'Konark Sun Temple & Chandrabhaga Beach',
      'Puri-Konark Marine Drive scenic drive',
      'Chilika Lake (Satapada dolphin viewpoint)',
      'Bhubaneswar Temples (Lingaraj & Dhauli Peace Pagoda)',
    ],
    recommendedVehicles: 'Honda Amaze / Swift Dzire / Baleno Automatic / Scorpio',
    highlights: [
      'Comfortable long-distance touring package with unlimited freedom',
      'Spacious boot space for luggage and temple prasad',
      'Available with self-drive convenience or trusted chauffeur',
    ],
  },
];

export const SERVICE_AREAS_ROURKELA = [
  'Sector 1 to Sector 21, Rourkela',
  'Civil Township & Basanti Nagar',
  'Koel Nagar & Shakti Nagar',
  'Chhend Colony & Phase 1/2/3',
  'Panposh & Raghunathpali',
  'Uditnagar & Daily Market',
  'Rourkela Railway Station (Doorstep Delivery)',
  'Vedvyas & Brahmani Tarang',
  'Bisra & Bondamunda',
  'Kalunga Industrial Estate',
  'Rajgangpur & Sundargarh District',
] as const;

export const CAR_MODELS: CarModel[] = [
  {
    id: 'swift-dzire',
    name: 'Swift Dzire',
    price12h: 1500,
    price24h: 2000,
    image: '/src/assets/images/car_dzire_real.jpg',
    alt: 'White Maruti Suzuki Swift Dzire self-drive rental car in Rourkela',
    shortNote: 'Compact sedan package for comfortable self-drive journeys.',
  },
  {
    id: 'baleno',
    name: 'Baleno',
    price12h: 1300,
    price24h: 1800,
    image: '/src/assets/images/car_baleno_real.jpg',
    alt: 'Black Maruti Suzuki Baleno self-drive rental hatchback in Rourkela',
    shortNote: 'Refined hatchback package suited for city and highway drives.',
  },
  {
    id: 'baleno-automatic',
    name: 'Baleno Automatic',
    price12h: 2500,
    price24h: 3200,
    image: '/src/assets/images/car_baleno_real.jpg',
    alt: 'Maruti Suzuki Baleno Automatic self-drive rental hatchback in Rourkela',
    shortNote: 'Effortless automatic drive package for city and highway cruising.',
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    price12h: 2500,
    price24h: 3200,
    image: '/src/assets/images/car_scorpio.jpg',
    alt: 'Mahindra Scorpio self-drive rental SUV in Rourkela',
    shortNote: 'Spacious 7-seater powerhouse SUV for highway journeys & rough terrains.',
  },
  {
    id: 'bolero',
    name: 'Mahindra Bolero',
    price12h: 2500,
    price24h: 3200,
    image: '/src/assets/images/car_bolero_real.jpg',
    alt: 'White Mahindra Bolero self-drive rental SUV in Rourkela',
    shortNote: 'Rugged and reliable 7-seater for outstation and rural terrain trips.',
  },
  {
    id: 'grand-vitara',
    name: 'Grand Vitara',
    price12h: 1600,
    price24h: 2300,
    image: '/src/assets/images/car_grand_vitara_real.jpg',
    alt: 'Silver Maruti Suzuki Grand Vitara self-drive crossover car in Rourkela',
    shortNote: 'Modern crossover SUV stance for versatile self-drive travel.',
  },
  {
    id: 'swift',
    name: 'Swift',
    price12h: 1200,
    price24h: 1800,
    image: '/src/assets/images/car_swift_1795091054156.jpg',
    alt: 'Pearl white Maruti Suzuki Swift self-drive rental hatchback',
    shortNote: 'Agile hatchback package built for effortless daily drives.',
  },
];

export const RENTAL_DURATIONS: RentalDuration[] = [
  '12 Hours',
  '24 Hours',
  '48 Hours',
  '5 Days',
  '1 Week',
  '1 Month',
  'Others',
];

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function getCarById(id: string): CarModel | undefined {
  return CAR_MODELS.find((car) => car.id === id || car.name.toLowerCase() === id.toLowerCase());
}
