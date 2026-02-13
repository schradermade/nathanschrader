import type { Metadata } from 'next';
import { IBM_Plex_Sans, Fraunces } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

const serif = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Nathan Schrader',
  description: 'Applied AI, systems architecture, and field-grade reliability work.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const tealiumUtagUrl = 'https://tags.nathanschrader.com/main/prod/utag.js';

  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <Script id="tealium-utag" strategy="afterInteractive" src={tealiumUtagUrl} />
        {children}
      </body>
    </html>
  );
}
