// Central configuration for Pearl Dental Studio
// All business content is stored here for easy editing

export const siteConfig = {
  name: 'KUMARAN',
  fullName: 'Kumaran Dental',
  tagline: 'Dentistry worth smiling about.',
  description:
    'Modern dentistry in Manhattan. Kumaran Dental offers preventive, cosmetic, restorative, Invisalign, whitening, and implant dentistry in New York City.',
  url: 'https://pearldentalnyc.com',

  contact: {
    address: {
      street: '142 West 21st Street',
      city: 'New York',
      state: 'NY',
      zip: '10011',
      neighborhood: 'Between Sixth & Seventh Avenue',
      full: '142 West 21st Street, New York, NY 10011',
    },
    phone: '+1 (212) 555-0184',
    phoneRaw: '+12125550184',
    email: 'hello@pearldentalnyc.com',
    instagram: '@pearldentalnyc',
    instagramUrl: 'https://instagram.com/pearldentalnyc',
    tiktokUrl: 'https://tiktok.com/@pearldentalnyc',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=142+West+21st+Street+New+York+NY+10011',
  },

  hours: {
    weekdays: { days: 'Monday–Friday', hours: '8:00 AM – 7:00 PM' },
    saturday: { days: 'Saturday', hours: '9:00 AM – 3:00 PM' },
    sunday: { days: 'Sunday', hours: 'Closed' },
  },

  social: {
    instagram: 'https://instagram.com/pearldentalnyc',
    tiktok: 'https://tiktok.com/@pearldentalnyc',
  },
} as const;

export const doctors = [
  {
    id: 'olivia-bennett',
    name: 'Dr. Olivia Bennett',
    firstName: 'Olivia',
    lastName: 'Bennett',
    title: 'Cosmetic & Restorative Dentist',
    bio: 'Dr. Bennett focuses on cosmetic and restorative dentistry, including veneers, whitening, restorative treatments, and comprehensive smile planning.',
    specialties: ['Veneers', 'Whitening', 'Restorative', 'Smile Planning'],
    color: '#D4C5F9',
  },
  {
    id: 'ethan-parker',
    name: 'Dr. Ethan Parker',
    firstName: 'Ethan',
    lastName: 'Parker',
    title: 'General & Implant Dentist',
    bio: 'Dr. Parker focuses on preventive dentistry, restorative dentistry, dental implants, and long-term oral health.',
    specialties: ['Preventive', 'Implants', 'Restorative', 'Oral Health'],
    color: '#E8F5EE',
  },
] as const;

export const services = [
  {
    id: 'cosmetic',
    name: 'Cosmetic Dentistry',
    shortName: 'Cosmetic',
    description:
      'Thoughtful treatments designed to improve the appearance, proportion, and confidence of your smile.',
    color: '#D4C5F9',
    bgColor: 'bg-pearl-lavender',
  },
  {
    id: 'invisalign',
    name: 'Invisalign',
    shortName: 'Invisalign',
    description: 'Clear aligner treatment designed around your lifestyle.',
    color: '#E8F5EE',
    bgColor: 'bg-pearl-mint',
  },
  {
    id: 'veneers',
    name: 'Veneers',
    shortName: 'Veneers',
    description:
      'Custom porcelain veneers planned around your facial proportions and natural smile.',
    color: '#F5F0EB',
    bgColor: 'bg-pearl-cream',
  },
  {
    id: 'whitening',
    name: 'Whitening',
    shortName: 'Whitening',
    description: 'Professional whitening for a noticeably brighter smile.',
    color: '#FFFDE7',
    bgColor: 'bg-yellow-50',
  },
  {
    id: 'implants',
    name: 'Dental Implants',
    shortName: 'Implants',
    description: 'Modern solutions for replacing missing teeth.',
    color: '#FFD5C2',
    bgColor: 'bg-pearl-peach',
  },
  {
    id: 'preventive',
    name: 'Preventive Care',
    shortName: 'Preventive',
    description:
      'Routine exams, cleanings, digital imaging, and personalized preventive care.',
    color: '#E8F5EE',
    bgColor: 'bg-pearl-mint',
  },
  {
    id: 'restorative',
    name: 'Restorative Dentistry',
    shortName: 'Restorative',
    description:
      'Modern restorations designed around function, comfort, and natural appearance.',
    color: '#E8E0D8',
    bgColor: 'bg-pearl-warm',
  },
  {
    id: 'emergency',
    name: 'Emergency Dentistry',
    shortName: 'Emergency',
    description: 'Urgent appointments for unexpected dental problems.',
    color: '#FFD5C2',
    bgColor: 'bg-pearl-peach',
  },
] as const;

export const testimonials = [
  {
    id: 1,
    quote: 'I genuinely forgot I was at the dentist.',
    author: 'Rachel M.',
    location: 'Chelsea',
  },
  {
    id: 2,
    quote:
      "This is probably the first dental appointment I've ever actually enjoyed.",
    author: 'Michael T.',
    location: 'SoHo',
  },
  {
    id: 3,
    quote:
      'Everything from booking to the appointment itself felt incredibly easy.',
    author: 'Jessica L.',
    location: 'West Village',
  },
] as const;

export const faqs = [
  {
    id: 1,
    question: 'Are you accepting new patients?',
    answer:
      'Yes! We are always welcoming new patients at Kumaran Dental. You can book your first appointment online or by calling our studio directly.',
  },
  {
    id: 2,
    question: 'Do you accept dental insurance?',
    answer:
      `We work with many PPO dental insurance plans and can help you understand your benefits before treatment. Contact us with your insurance details and we'll verify your coverage.`,
  },
  {
    id: 3,
    question: 'How often should I visit the dentist?',
    answer:
      'We generally recommend visiting every six months for a routine checkup and cleaning, though some patients may benefit from more frequent visits depending on their needs.',
  },
  {
    id: 4,
    question: 'Do you offer emergency appointments?',
    answer:
      `Yes. If you're experiencing a dental emergency, call our studio and we will do our best to see you as soon as possible, often the same day.`,
  },
  {
    id: 5,
    question: 'How long does professional whitening take?',
    answer:
      `Our in-studio professional whitening treatment typically takes about one hour. You'll see noticeable results in a single visit.`,
  },
  {
    id: 6,
    question: 'Do you offer Invisalign consultations?',
    answer:
      'Absolutely. We offer complimentary Invisalign consultations where we can assess your smile and discuss whether clear aligner treatment is right for you.',
  },
  {
    id: 7,
    question: 'Where are you located?',
    answer:
      `Kumaran Dental is located at 142 West 21st Street in Manhattan, between Sixth and Seventh Avenue. We're easily accessible by subway and surrounded by great coffee shops for before or after your visit.`,
  },
] as const;

export const stats = {
  rating: { value: '4.9', label: 'Average patient rating', outOf: '5' },
  patients: { value: '2,500+', label: 'smiles cared for' },
} as const;

export const journeySteps = [
  {
    number: '01',
    title: 'Say Hello',
    description: 'Book online or call the studio.',
    color: '#E8F5EE',
  },
  {
    number: '02',
    title: 'Come In',
    description: 'Visit our Manhattan studio.',
    color: '#D4C5F9',
  },
  {
    number: '03',
    title: 'Digital Scan',
    description: 'We use modern imaging to understand your smile.',
    color: '#FFD5C2',
  },
  {
    number: '04',
    title: 'Make a Plan',
    description: "We'll explain what we see and discuss your options.",
    color: '#F5F0EB',
  },
  {
    number: '05',
    title: 'Leave Smiling',
    description: "That's the idea.",
    color: '#C8FF00',
  },
] as const;

export const formServices = [
  'New Patient Exam',
  'Cleaning',
  'Cosmetic Consultation',
  'Invisalign Consultation',
  'Whitening',
  'Veneers',
  'Dental Implant Consultation',
  'Emergency Visit',
  'Other',
] as const;

export const experiencePrinciples = [
  {
    id: 'comfort',
    word: 'COMFORT',
    title: 'No judgment',
    description:
      "We're here to help you move forward, not lecture you about the past.",
    color: '#E8F5EE',
    textColor: '#1A1A1A',
  },
  {
    id: 'clarity',
    word: 'CLARITY',
    title: 'Transparent care',
    description: 'We explain options clearly before treatment begins.',
    color: '#D4C5F9',
    textColor: '#1A1A1A',
  },
  {
    id: 'tech',
    word: 'TECH',
    title: 'Modern technology',
    description:
      'Digital scanning, imaging, and treatment planning make visits easier.',
    color: '#1A1A1A',
    textColor: '#FAF8F5',
  },
  {
    id: 'care',
    word: 'CARE',
    title: 'Designed for humans',
    description:
      'Comfortable spaces, friendly people, and appointments designed around real schedules.',
    color: '#C8FF00',
    textColor: '#1A1A1A',
  },
] as const;
