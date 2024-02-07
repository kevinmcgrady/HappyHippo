import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import { Toaster } from 'sonner';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { cn } from '@/lib/utils';
import { Providers } from '@/providers/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Happy Hippo',
  description: 'Start Shopping!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='h-full'>
      <body
        className={cn('relative h-full font-sans antialiased', inter.className)}
      >
        <main className='relative flex flex-col min-h-screen'>
          <Providers>
            <Navbar />
            <div className='flex-grow flex-1'>{children}</div>
            <Footer />
          </Providers>
        </main>
        <Toaster position='top-center' richColors />
      </body>
    </html>
  );
}
