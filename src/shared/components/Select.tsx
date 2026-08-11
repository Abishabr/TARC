import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '../utils/cn'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, label, error, id, children, ...props },
  ref,
) {
  const errorId = id ? `${id}-error` : undefined

  return (
    <label className="flex flex-col gap-1 text-sm text-neutral-700">
      {label ? <span className="font-medium">{label}</span> : null}
      <select
        id={id}
        ref={ref}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={cn(
          'rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20',
          error ? 'border-danger' : '',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error ? (
        <span id={errorId} className="text-xs text-danger">
          {error}
        </span>
      ) : null}
    </label>
  )
})
