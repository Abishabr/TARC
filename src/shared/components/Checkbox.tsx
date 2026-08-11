import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../utils/cn'

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, label, disabled, ...props },
  ref,
) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
      <input
        ref={ref}
        type="checkbox"
        disabled={disabled}
        className={cn(
          'h-4 w-4 rounded border border-neutral-300 text-primary focus:ring-primary/60',
          disabled ? 'opacity-60' : '',
          className,
        )}
        {...props}
      />
      {label}
    </label>
  )
})
