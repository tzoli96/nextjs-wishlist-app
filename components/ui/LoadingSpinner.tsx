export default function LoadingSpinner() {
  return (
    <div
      className="flex items-center justify-center py-20"
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
