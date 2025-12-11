'use client'

import Link from 'next/link'
import { Product } from '@/types/product'
import { formatPrice } from '@/lib/utils'
import ProductImage from '@/components/ui/ProductImage'
import Rating from '@/components/ui/Rating'
import WishlistButton from '@/components/features/WishlistButton'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useProduct } from '@/hooks/useProduct'

interface ProductDetailClientProps {
  productId: string
  initialProduct: Product
}

export default function ProductDetailClient({
  productId,
  initialProduct,
}: ProductDetailClientProps) {
  // SWR with fallback data from SSR (no duplicate fetch!)
  const { product, isLoading, isError, mutate } = useProduct(
    productId,
    initialProduct
  )

  // SWR will use initialProduct on first render, then manage cache
  const displayProduct = product

  if (isLoading && !initialProduct) {
    return <LoadingSpinner />
  }

  if (isError && !initialProduct) {
    return (
      <ErrorMessage
        title="Failed to load product"
        message="The product could not be found or there was an error loading it."
        onRetry={() => mutate()}
      />
    )
  }

  if (!displayProduct) {
    return (
      <ErrorMessage
        title="Product not found"
        message="The product you're looking for doesn't exist."
      />
    )
  }

  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Products
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <ProductImage
            src={displayProduct.image}
            alt={displayProduct.title}
            priority
            containerClassName="relative h-96 bg-gray-100 rounded-lg"
            className="object-contain p-8"
          />

          <div>
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {displayProduct.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {displayProduct.title}
            </h1>

            <div className="mb-4">
              <Rating
                rating={displayProduct.rating.rate}
                count={displayProduct.rating.count}
                size="md"
              />
            </div>

            <p className="text-4xl font-bold text-blue-600 mb-6">
              {formatPrice(displayProduct.price)}
            </p>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {displayProduct.description}
              </p>
            </div>

            <WishlistButton product={displayProduct} />
          </div>
        </div>
      </div>
    </div>
  )
}
