'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useWishlistStore } from '@/features/wishlist/store/useWishlistStore'

export default function Navigation() {
  const pathname = usePathname()
  const items = useWishlistStore((state) => state.items)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Wishlist App
            </Link>
          </div>
          <div className="flex space-x-8">
            <Link
              href="/"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${
                pathname === '/'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Products
            </Link>
            <Link
              href="/wishlist"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${
                pathname === '/wishlist'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Wishlist {items.length > 0 && <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">({items.length})</span>}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
