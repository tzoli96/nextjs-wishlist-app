'use client'

import ProductsListClient from '@/components/features/ProductsListClient'

// Client-Side Rendering - API calls happen in the browser
// This avoids 403 errors from FakeStore API blocking Vercel server IPs
export default function Home() {
  // No server-side fetch - ProductsListClient handles everything client-side
  return <ProductsListClient initialProducts={[]} />
}
