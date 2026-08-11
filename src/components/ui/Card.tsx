import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type CardProps = {
  children: ReactNode
  className?: string
  title?: string
  subtitle?: string
}

export function Card({ children, className, title, subtitle }: CardProps) {
  return (
    <div className={cn('rounded-3xl border border-slate-200 bg-white p-6 shadow-sm', className)}>
      {title ? (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
        </div>
      ) : null}
      {children}
    </div>
  )
}
