import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit'
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const baseStyles =
    'font-semibold rounded-full tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center'

  const variants = {
    primary:
      'bg-gold-gradient text-ink shadow-gold-soft hover:shadow-glow-lg hover:-translate-y-0.5',
    secondary:
      'bg-ink-card text-body border border-ink-border hover:border-gold/60 hover:text-gold',
    outline:
      'border border-gold/60 text-gold hover:bg-gold hover:text-ink',
    ghost: 'text-gold hover:bg-gold/10',
  }

  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-7 py-3 text-base',
    lg: 'px-9 py-4 text-base md:text-lg',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}
