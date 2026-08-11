import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ className, label, error, id, ...props }, ref) {
  const errorId = id ? `${id}-error` : undefined

  return (
    <label className="flex flex-col gap-2 text-sm text-slate-700">
      {label ? <span className="font-medium">{label}</span> : null}
      <textarea
        id={id}
        ref={ref}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={cn(
          'min-h-28 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20',
          error ? 'border-rose-300' : '',
          className,
        )}
        {...props}
      />
      {error ? (
        <span id={errorId} className="text-xs text-rose-600">
          {error}
        </span>
      ) : null}
    </label>
  )
})
