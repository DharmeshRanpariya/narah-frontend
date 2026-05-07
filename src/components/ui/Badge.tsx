import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'success' | 'warning' | 'danger'
  className?: string
}

export default function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  const variants = {
    primary: 'bg-primary text-white',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
  }

  return (
    <span className={`inline-block px-3 py-1 rounded text-xs font-bold ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
