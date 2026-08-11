import { type ReactNode } from 'react'
import { cn } from '../utils/cn'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info'

type BadgeProps = {
  variant?: BadgeVariant
  className?: string
  children: ReactNode
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 text-neutral-800',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
  info: 'bg-info/10 text-info',
}

export function Badge({ variant = 'default', className, children }: BadgeProps) {
  return <span className={cn('inline-flex rounded-full px-3 py-1 text-xs font-medium', variantClasses[variant], className)}>{children}</span>
}
