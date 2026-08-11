import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../utils/cn'

type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { className, label, disabled, ...props },
  ref,
) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
      <input
        ref={ref}
        type="radio"
        disabled={disabled}
        className={cn(
          'h-4 w-4 rounded-full border border-neutral-300 text-primary focus:ring-primary/60',
          disabled ? 'opacity-60' : '',
          className,
        )}
        {...props}
      />
      {label}
    </label>
  )
})
