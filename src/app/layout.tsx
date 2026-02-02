import type { Metadata } from 'next';
import { IBM_Plex_Sans, Fraunces } from 'next/font/google';
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
