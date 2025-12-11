'use client'

import { Product } from '@/types/product'
import ProductCard from '@/components/features/ProductCard'
import EmptyState from '@/components/ui/EmptyState'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useProducts } from '@/hooks/useProducts'

interface ProductsListClientProps {
  initialProducts: Product[]
}

export default function ProductsListClient({
  initialProducts,
}: ProductsListClientProps) {
  // SWR with fallback data from SSR (no duplicate fetch!)
  const { products, isLoading, isError, mutate } = useProducts(initialProducts)

  // SWR will use initialProducts on first render, then manage cache
  const displayProducts = products

  if (isLoading && initialProducts.length === 0) {
    return <LoadingSpinner />
  }

  if (isError && initialProducts.length === 0) {
    return (
      <ErrorMessage
        title="Failed to load products"
        message="There was an error loading the products. Please try again."
        onRetry={() => mutate()}
      />
    )
  }

  if (displayProducts.length === 0) {
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
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
