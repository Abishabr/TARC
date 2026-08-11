import { useState, type ReactNode } from 'react'
import { cn } from '../utils/cn'

type DropdownProps = {
  trigger: ReactNode
  children: ReactNode
}

export function Dropdown({ trigger, children }: DropdownProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex items-center rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm">
        {trigger}
      </button>
      {open ? (
        <div className="absolute right-0 mt-2 w-56 rounded-3xl border border-neutral-200 bg-white shadow-soft">
          {children}
        </div>
      ) : null}
    </div>
  )
}
