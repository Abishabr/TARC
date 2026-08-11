import { type ReactNode } from 'react'

type EmptyStateProps = {
  title: string
  description?: string
  icon?: ReactNode
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center">
      {icon ? <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary">{icon}</div> : null}
      <h2 className="text-xl font-semibold text-neutral-900">{title}</h2>
      {description ? <p className="mt-2 text-sm text-neutral-600">{description}</p> : null}
    </div>
  )
}
