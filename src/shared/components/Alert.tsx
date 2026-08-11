import { type ReactNode } from 'react'
import { cn } from '../utils/cn'

type AlertVariant = 'success' | 'warning' | 'danger' | 'info'

type AlertProps = {
  variant?: AlertVariant
  title: string
  description?: string
  className?: string
}

const variantClasses: Record<AlertVariant, string> = {
  success: 'bg-success/10 text-success border-success/30',
  warning: 'bg-warning/10 text-warning border-warning/30',
  danger: 'bg-danger/10 text-danger border-danger/30',
  info: 'bg-info/10 text-info border-info/30',
}

export function Alert({ variant = 'info', title, description, className }: AlertProps) {
  return (
    <div className={cn('rounded-3xl border p-4', variantClasses[variant], className)}>
      <p className="font-semibold">{title}</p>
      {description ? <p className="mt-1 text-sm">{description}</p> : null}
    </div>
  )
}
