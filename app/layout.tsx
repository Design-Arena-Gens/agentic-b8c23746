import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Therapy Sessions Booking',
  description: 'Book your therapy sessions with qualified professionals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
