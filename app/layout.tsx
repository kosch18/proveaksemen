import type { Metadata } from 'next'
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import { headers } from 'next/headers'
import { Toaster } from 'sonner'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CookieConsent } from '@/components/layout/CookieConsent'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter-tight',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Nordic Devices — IT Equipment for Business',
    template: '%s — Nordic Devices',
  },
  description:
    'Norwegian IT equipment reseller based in Hamar. We supply and rent laptops, network gear, servers and development hardware to businesses across Norway.',
  keywords: ['IT equipment', 'laptop rental', 'network gear', 'UniFi', 'business IT', 'Norway', 'Hamar'],
  authors: [{ name: 'Nordic Devices AS' }],
  icons: {
    icon: [
      { url: '/11111.png', type: 'image/png' },
    ],
    shortcut: '/11111.png',
    apple: '/11111.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Nordic Devices',
    title: 'Nordic Devices — IT Equipment for Business',
    description:
      'Norwegian IT equipment reseller — laptops, network gear, servers and development hardware.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nordicdevices',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = (await headers()).get('x-current-path') ?? ''
  const isAdmin  = pathname.startsWith('/admin')

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <ThemeProvider>
          {!isAdmin && <Header />}
          <main className="flex-1">{children}</main>
          {!isAdmin && <Footer />}
          {!isAdmin && <CookieConsent />}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
