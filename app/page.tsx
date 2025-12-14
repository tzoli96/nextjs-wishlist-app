'use client'

import { Product } from '@/types/product'
import ProductCard from '@/components/features/ProductCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import EmptyState from '@/components/ui/EmptyState'
import { useProducts } from '@/hooks/useProducts'

// Client-Side Rendering - API calls happen in the browser
// This avoids 403 errors from FakeStore API blocking Vercel server IPs
export default function Home() {
  // Fetch products client-side with SWR (no initialProducts)
  const { products, isLoading, isError, mutate } = useProducts()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return (
      <ErrorMessage
        title="Failed to load products"
        message="There was an error loading the products. Please try again."
        onRetry={() => mutate()}
      />
    )
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products available"
        description="Check back later for new products."
      />
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600">Discover our collection of products</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
