'use client'

import Link from 'next/link'
import { useWishlistStore } from '@/features/wishlist/store/useWishlistStore'
import { formatPrice, pluralize } from '@/lib/utils'
import ProductImage from '@/components/ui/ProductImage'
import Rating from '@/components/ui/Rating'
import EmptyState from '@/components/ui/EmptyState'

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()

  if (items.length === 0) {
    return (
      <EmptyState
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        }
        title="Your wishlist is empty"
        description="Start adding products to your wishlist to see them here!"
        actionText="Browse Products"
        actionHref="/"
      />
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
        <p className="text-gray-600">
          You have {items.length} {pluralize(items.length, 'item')} in your
          wishlist
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <Link href={`/product/${product.id}`}>
              <ProductImage
                src={product.image}
                alt={product.title}
                containerClassName="relative h-64 bg-gray-100"
                className="object-contain p-4 hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <div className="p-4">
              <Link href={`/product/${product.id}`}>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                  {product.title}
                </h3>
              </Link>
              <div className="flex items-center justify-between mb-3">
                <p className="text-2xl font-bold text-blue-600">
                  {formatPrice(product.price)}
                </p>
              </div>
              <div className="mb-3">
                <Rating
                  rating={product.rating.rate}
                  count={product.rating.count}
                  size="sm"
                />
              </div>
              <button
                onClick={() => removeItem(product.id)}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
