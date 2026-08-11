import { type ReactNode } from 'react'
import { cn } from '../utils/cn'

type StatCardProps = {
  title: string
  value: string
  description?: string
  className?: string
}

export function StatCard({ title, value, description, className }: StatCardProps) {
  return (
    <div className={cn('rounded-3xl border border-neutral-200 bg-white p-6 shadow-soft', className)}>
      <p className="text-sm uppercase tracking-[0.24em] text-neutral-500">{title}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
      {description ? <p className="mt-2 text-sm text-neutral-600">{description}</p> : null}
    </div>
  )
}
