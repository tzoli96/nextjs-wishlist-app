import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
      <p className="text-gray-600 mb-8">
        Sorry, we couldn't find the product you're looking for.
      </p>
      <Link
        href="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        Back to Products
      </Link>
    </div>
  )
}
