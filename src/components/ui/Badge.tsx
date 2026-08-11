import { cn } from '@/lib/utils'

type BadgeProps = {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  className?: string
}

const variantClasses = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-rose-50 text-rose-700',
  info: 'bg-sky-50 text-sky-700',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return <span className={cn('inline-flex rounded-full px-3 py-1 text-xs font-medium', variantClasses[variant], className)}>{children}</span>
}
