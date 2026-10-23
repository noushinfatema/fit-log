'use client'
import './globals.css';
import { Suspense } from 'react';
import { PlanProvider } from '@/context/PlanContext';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0C0D10] text-white">
        <PlanProvider>
          <Toaster position="bottom-right" toastOptions={{ duration: 2500 }} />
          <Suspense fallback={<div className="h-16 bg-[#0C0D10]" />}>
            <Navbar />
          </Suspense>
          {children}
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}