import { forwardRef, type InputHTMLAttributes } from 'react'

type SwitchProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, disabled, checked, ...props },
  ref,
) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3 text-sm text-neutral-700">
      <span>{label}</span>
      <div className={`relative inline-flex h-6 w-11 items-center rounded-full bg-neutral-300 transition ${disabled ? 'opacity-60' : ''}`}>
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <span className={`pointer-events-none absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition ${checked ? 'translate-x-5 bg-primary' : ''}`} />
      </div>
    </label>
  )
})
