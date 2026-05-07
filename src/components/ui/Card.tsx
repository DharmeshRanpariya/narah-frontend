import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
}

export default function Card({ children, className = '', onClick, hover = true }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg border border-gray-200 ${
        hover ? 'transition-all duration-300 hover:shadow-lg cursor-pointer' : 'transition-shadow duration-300'
      } ${className}`}
    >
      {children}
    </div>
  )
}
