'use client'

import { Component, ReactNode } from 'react'
import ErrorMessage from './ui/ErrorMessage'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error reporting service
    // In production, send to Sentry/LogRocket/etc
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <ErrorMessage
          title="Something went wrong"
          message="An unexpected error occurred. Please refresh the page or try again later."
          onRetry={() => {
            this.setState({ hasError: false, error: undefined })
            window.location.reload()
          }}
        />
      )
    }

    return this.props.children
  }
}
