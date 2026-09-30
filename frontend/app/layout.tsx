import type { Metadata } from 'next'

import Providers from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'POS System',
  description: 'Point of Sale Management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}