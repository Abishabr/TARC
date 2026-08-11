import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '../utils/cn'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, label, error, id, ...props },
  ref,
) {
  const errorId = id ? `${id}-error` : undefined

  return (
    <label className="flex flex-col gap-1 text-sm text-neutral-700">
      {label ? <span className="font-medium">{label}</span> : null}
      <textarea
        id={id}
        ref={ref}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={cn(
          'min-h-[120px] rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none',
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
