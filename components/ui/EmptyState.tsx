import Link from 'next/link'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  actionText?: string
  actionHref?: string
}

export default function EmptyState({
  icon,
  title,
  description,
  actionText,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="text-center py-20">
      {icon && <div className="mb-6">{icon}</div>}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-600 mb-8">{description}</p>
      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {actionText}
        </Link>
      )}
    </div>
  )
}
