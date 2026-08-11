import { type ReactNode } from 'react'
import { cn } from '../utils/cn'

type TableProps = {
  className?: string
  children: ReactNode
}

export function Table({ className, children }: TableProps) {
  return (
    <div className={cn('overflow-x-auto rounded-3xl border border-neutral-200 bg-white shadow-soft', className)}>
      <table className="min-w-full divide-y divide-neutral-200">{children}</table>
    </div>
  )
}
