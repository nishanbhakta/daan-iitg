import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DAAN IITG — Freshers Welcome & Orientation Portal',
  description:
    'A scholar-network initiative by Dakshana Scholars helping incoming first-year students at IIT Guwahati navigate admission, hostel life, and their first year.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0e7490',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-gray-900">
      <body className={`${inter.className} antialiased bg-gray-900 text-gray-100`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
