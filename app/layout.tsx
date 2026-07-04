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

export const metadata: Metadata = {
  title: 'MH-TOHA - Full-Stack Developer & Digital Builder',
  description:
    'Mahmudul Hasan Toha - Full-Stack Web Developer, AI Integration Engineer, and CEO of TEX-IT. Building world-class digital products from Dhaka, Bangladesh.',
  keywords: ['MH-TOHA', 'Next.js Developer', 'React Developer', 'Three.js', 'AI Integration', 'Web Developer Bangladesh', 'Full Stack Developer'],
  authors: [{ name: 'Mahmudul Hasan Toha', url: 'https://mh-toha.com' }],
  creator: 'Mahmudul Hasan Toha',
  metadataBase: new URL('https://mh-toha.com'),
  openGraph: {
    type: 'website',
    url: 'https://mh-toha.com',
    title: 'MH-TOHA - Full-Stack Developer & Digital Builder',
    description: 'Engineering precision, developer\'s craft - 5+ years delivering for global clients.',
    siteName: 'MH-TOHA Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MH-TOHA Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MH-TOHA - Full-Stack Developer',
    description: 'Engineering precision, developer\'s craft - 5+ years delivering for global clients.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ScrollProgress />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
