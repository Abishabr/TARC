import { type ReactNode } from 'react'
import { cn } from '../utils/cn'

type BreadcrumbProps = {
  items: { label: string; href?: string }[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn('flex flex-wrap gap-2 text-sm text-neutral-600', className)} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={item.label} className="inline-flex items-center gap-2">
          {item.href ? (
            <a href={item.href} className="text-primary hover:underline">
              {item.label}
            </a>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 ? <span>/</span> : null}
        </span>
      ))}
    </nav>
  )
}
