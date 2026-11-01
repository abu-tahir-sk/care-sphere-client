import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CareSphere | Community-Driven Social Development Events Platform',
  description:
    'Join hands with local volunteers to create, join, and track social service events in your neighborhood. From winter clothes distribution in Mirpur to emergency food drives in Mohammadpur.',
  keywords: [
    'CareSphere',
    'Community Events',
    'Social Service Bangladesh',
    'Volunteering Dhaka',
    'Winter Clothes Distribution',
    'Charity Platform',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${manrope.variable}`}>
      <body
        suppressHydrationWarning
        className="antialiased min-h-screen flex flex-col bg-[#F7F8F0] dark:bg-[#0A130E] text-[#101B17] dark:text-[#F7F8F0] transition-colors duration-200"
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1e293b',
                  color: '#ffffff',
                  borderRadius: '1rem',
                  fontSize: '0.875rem',
                },
              }}
            />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

