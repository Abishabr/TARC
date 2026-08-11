import { type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

type ModalProps = {
  open: boolean
  title: string
  description?: string
  children: ReactNode
  onClose: () => void
  className?: string
}

export function Modal({ open, title, description, children, onClose, className }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4">
      <div className={cn('w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl', className)}>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
