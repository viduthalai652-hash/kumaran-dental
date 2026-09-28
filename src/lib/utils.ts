import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function splitTextToChars(text: string): string[] {
  return text.split('');
}

export function splitTextToWords(text: string): string[] {
  return text.split(' ');
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export function buildMailtoLink(data: Record<string, string>, to: string): string {
  const subject = encodeURIComponent('Appointment Enquiry — Pearl Dental Studio');
  const bodyLines = Object.entries(data)
    .filter(([, value]) => value.trim() !== '')
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
  const body = encodeURIComponent(
    `New appointment enquiry from pearldentalnyc.com\n\n${bodyLines}\n\n---\nThis is an appointment enquiry only. The clinic will follow up to confirm availability.`
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
}
