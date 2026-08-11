import { type ReactNode } from 'react'
import { cn } from '../utils/cn'

type CardProps = {
  className?: string
  children: ReactNode
}

export function Card({ className, children }: CardProps) {
  return <div className={cn('rounded-3xl border border-neutral-200 bg-white p-6 shadow-soft', className)}>{children}</div>
}
