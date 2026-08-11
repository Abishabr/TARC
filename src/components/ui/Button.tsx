import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const variantClasses = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  secondary: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
}

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', size = 'md', loading = false, disabled = false, children, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
})
