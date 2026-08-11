import { type ReactNode } from 'react'

type PageHeaderProps = {
  title: string
  subtitle?: string
  actions?: ReactNode
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-neutral-600">{subtitle}</p> : null}
      </div>
      {actions ? <div>{actions}</div> : null}
    </div>
  )
}
