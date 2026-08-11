import { type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

type ModalProps = {
  open: boolean
  title: string
  children: ReactNode
  onClose?: () => void
}

export function Modal({ open, title, children, onClose }: ModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-elevated"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h2 id="modal-title" className="text-xl font-semibold text-slate-900">
                {title}
              </h2>
              {onClose ? (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="rounded-full p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-slate-900"
                >
                  <X className="h-5 w-5" />
                </button>
              ) : null}
            </div>
            <div>{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
