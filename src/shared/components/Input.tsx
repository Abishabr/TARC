import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../utils/cn'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, label, error, id, ...props },
  ref,
) {
  const errorId = id ? `${id}-error` : undefined

  return (
    <label className="flex flex-col gap-1 text-sm text-neutral-700">
      {label ? <span className="font-medium">{label}</span> : null}
      <input
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
      />
      {error ? (
        <span id={errorId} className="text-xs text-danger">
          {error}
        </span>
      ) : null}
    </label>
  )
})
