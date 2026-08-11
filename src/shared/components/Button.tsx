import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  secondary: 'bg-secondary text-white hover:bg-secondary/90',
  ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100',
  danger: 'bg-danger text-white hover:bg-danger/90',
}

const sizeClasses: Record<ButtonSize, string> = {
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
        'inline-flex items-center justify-center rounded-xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60',
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
