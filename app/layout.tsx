import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import ChatWidget from '@/components/ChatWidget';
import ScrollProgress from '@/components/fx/ScrollProgress';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const SITE = 'https://mh-toha.com';
const TITLE = 'MH-TOHA — Full-Stack Web Developer & AI Engineer in Bangladesh';
const DESC = 'Mahmudul Hasan Toha (MH-TOHA) — Full-Stack Web Developer, AI Integration Engineer & CEO of TEX-IT and BYV Tech. Next.js, React, Python & AI-powered websites, ERP, CRM and custom software for clients worldwide, from Dhaka, Bangladesh.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: TITLE,
    template: '%s | MH-TOHA',
  },
  description: DESC,
  applicationName: 'MH-TOHA Portfolio',
  keywords: [
    'MH-TOHA', 'Mahmudul Hasan Toha', 'Full-Stack Developer', 'Web Developer Bangladesh',
    'AI Integration Engineer', 'Next.js Developer', 'React Developer', 'Three.js Developer',
    'Python Developer', 'ERP software', 'CRM software', 'Custom software Bangladesh',
    'TEX-IT', 'BYV Tech', 'RMG website developer', 'Dhaka web developer', 'Hire web developer',
  ],
  authors: [{ name: 'Mahmudul Hasan Toha', url: SITE }],
  creator: 'Mahmudul Hasan Toha',
  publisher: 'MH-TOHA',
  category: 'technology',
  alternates: { canonical: SITE },
  formatDetection: { email: false, telephone: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: SITE,
    title: TITLE,
    description: DESC,
    siteName: 'MH-TOHA',
    locale: 'en_US',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MH-TOHA — Full-Stack Developer & AI Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    creator: '@mhtoha',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }],
    apple: '/icon.png',
  },
};

export const viewport = {
  themeColor: '#0EA5E9',
  width: 'device-width',
  initialScale: 1,
};

// Structured data (JSON-LD) — helps Google understand who Toha is
const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE}/#person`,
      name: 'Mahmudul Hasan Toha',
      alternateName: 'MH-TOHA',
      url: SITE,
      image: `${SITE}/images/hero/mh-toha-01.png`,
      jobTitle: 'Full-Stack Web Developer & AI Integration Engineer',
      email: 'connect.mhtoha@gmail.com',
      telephone: '+8801716102136',
      address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
      worksFor: [
        { '@type': 'Organization', name: 'TEX-IT Agency', url: 'https://texit.byv.life' },
        { '@type': 'Organization', name: 'BYV Tech', url: 'https://tech.byv.life' },
      ],
      knowsAbout: ['Next.js', 'React', 'Three.js', 'Python', 'Machine Learning', 'AI Integration', 'ERP', 'CRM', 'Web Development', 'SEO'],
      sameAs: [
        'https://github.com/mhtoha29',
        'https://linkedin.com/in/mahmudulhasantoha-mhtoha',
        'https://texit.byv.life',
        'https://tech.byv.life',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: SITE,
      name: 'MH-TOHA',
      description: DESC,
      publisher: { '@id': `${SITE}/#person` },
      inLanguage: 'en',
    },
    {
      '@type': 'ProfessionalService',
      name: 'MH-TOHA — Web Development & AI Solutions',
      image: `${SITE}/og-image.png`,
      url: SITE,
      email: 'connect.mhtoha@gmail.com',
      telephone: '+8801716102136',
      priceRange: '$$',
      areaServed: 'Worldwide',
      address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
      founder: { '@id': `${SITE}/#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>
        <ScrollProgress />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
