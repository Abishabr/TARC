import { type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

type DialogProps = {
  open: boolean
  title: string
  description?: string
  onClose: () => void
  children: ReactNode
}

export function Dialog({ open, title, description, onClose, children }: DialogProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            aria-describedby={description ? 'dialog-description' : undefined}
            className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-elevated"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 id="dialog-title" className="text-xl font-semibold text-slate-900">
                  {title}
                </h2>
                {description ? <p id="dialog-description" className="mt-2 text-sm text-neutral-600">{description}</p> : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="rounded-full p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
