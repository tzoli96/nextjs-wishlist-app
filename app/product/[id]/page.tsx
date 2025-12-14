'use client'

import { use } from 'react'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import ProductImage from '@/components/ui/ProductImage'
import Rating from '@/components/ui/Rating'
import WishlistButton from '@/components/features/WishlistButton'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useProduct } from '@/hooks/useProduct'

// Client-Side Rendering - API calls happen in the browser
// This avoids 403 errors from FakeStore API blocking Vercel server IPs
export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  // Fetch product client-side with SWR (no initialProduct)
  const { product, isLoading, isError, mutate } = useProduct(id)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError || !product) {
    return (
      <ErrorMessage
        title="Failed to load product"
        message="The product could not be found or there was an error loading it."
        onRetry={() => mutate()}
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
            src={product.image}
            alt={product.title}
            priority
            containerClassName="relative h-96 bg-gray-100 rounded-lg"
            className="object-contain p-8"
          />

          <div>
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            <div className="mb-4">
              <Rating
                rating={product.rating.rate}
                count={product.rating.count}
                size="md"
              />
            </div>

            <p className="text-4xl font-bold text-blue-600 mb-6">
              {formatPrice(product.price)}
            </p>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <WishlistButton product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}
