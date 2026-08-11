import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ className, label, error, id, children, ...props }, ref) {
  const errorId = id ? `${id}-error` : undefined

  return (
    <label className="flex flex-col gap-2 text-sm text-slate-700">
      {label ? <span className="font-medium">{label}</span> : null}
      <select
        id={id}
        ref={ref}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={cn(
          'rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20',
          error ? 'border-rose-300' : '',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error ? (
        <span id={errorId} className="text-xs text-rose-600">
          {error}
        </span>
      ) : null}
    </label>
  )
})
