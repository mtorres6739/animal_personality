import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import CookieBanner from '@/components/ui/cookie-banner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Animal Personality Quiz',
  description: 'Discover your animal personality type through our interactive quiz',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script 
          defer 
          data-project="6851ac5909e0969e5bdc86c2" 
          src="https://cdn.jsdelivr.net/gh/litlyx/litlyx-js/browser/litlyx.js"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
        <CookieBanner />
      </body>
    </html>
  );
}