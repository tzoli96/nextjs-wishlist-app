import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import ToastProvider from '@/components/layout/ToastProvider'
import ErrorBoundary from '@/components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'Wishlist App',
  description: 'A wishlist app built with Next.js, TypeScript, Tailwind CSS, and Zustand',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gray-50">
        <ErrorBoundary>
          <ToastProvider />
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </ErrorBoundary>
      </body>
    </html>
  )
}
