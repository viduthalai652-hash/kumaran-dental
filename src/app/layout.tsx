import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kumaran Dental | Dentist in Manhattan, NYC',
  description:
    'Modern dentistry in Manhattan. Kumaran Dental offers preventive, cosmetic, restorative, Invisalign, whitening, and implant dentistry in New York City.',
  keywords: [
    'dentist manhattan',
    'dentist nyc',
    'cosmetic dentistry',
    'invisalign nyc',
    'teeth whitening manhattan',
    'dental implants nyc',
    'kumaran dental',
    'dentist chelsea',
    'veneers nyc',
  ],
  authors: [{ name: 'Kumaran Dental' }],
  openGraph: {
    title: 'Kumaran Dental | Dentist in Manhattan, NYC',
    description:
      'Modern dentistry in Manhattan. Kumaran Dental offers preventive, cosmetic, restorative, Invisalign, whitening, and implant dentistry in New York City.',
    url: 'https://kumarandentalnyc.com',
    siteName: 'Kumaran Dental',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kumaran Dental | Dentist in Manhattan, NYC',
    description:
      'Modern dentistry in Manhattan. Kumaran Dental offers preventive, cosmetic, restorative, Invisalign, whitening, and implant dentistry in New York City.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Dentist',
              name: 'Kumaran Dental',
              description:
                'Modern dentistry in Manhattan. Kumaran Dental offers preventive, cosmetic, restorative, Invisalign, whitening, and implant dentistry in New York City.',
              url: 'https://kumarandentalnyc.com',
              telephone: '+1-212-555-0184',
              email: 'hello@kumarandentalnyc.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '142 West 21st Street',
                addressLocality: 'New York',
                addressRegion: 'NY',
                postalCode: '10011',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 40.7419,
                longitude: -73.9945,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                  ],
                  opens: '08:00',
                  closes: '19:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Saturday',
                  opens: '09:00',
                  closes: '15:00',
                },
              ],
              priceRange: '$$',
              image: 'https://kumarandentalnyc.com/og-image.jpg',
              sameAs: [
                'https://instagram.com/kumarandentalnyc',
                'https://tiktok.com/@kumarandentalnyc',
              ],
              medicalSpecialty: [
                'Cosmetic Dentistry',
                'General Dentistry',
                'Orthodontics',
              ],
            }),
          }}
        />
      </head>
      <body className="font-body antialiased bg-pearl-offwhite text-pearl-charcoal overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
