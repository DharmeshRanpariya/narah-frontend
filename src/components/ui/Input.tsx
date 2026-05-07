import React from 'react'

interface InputProps {
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  icon?: React.ReactNode
  className?: string
  error?: string
}

export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  className = '',
  error,
}: InputProps) {
  return (
    <div className="w-full">
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-4 ${icon ? 'pl-12' : ''} py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors ${
            error ? 'border-red-500' : ''
          } ${className}`}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
