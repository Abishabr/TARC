type SectionTitleProps = {
  title: string
  description?: string
}

export function SectionTitle({ title, description }: SectionTitleProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      {description ? <p className="mt-2 text-sm text-neutral-600">{description}</p> : null}
    </div>
  )
}
