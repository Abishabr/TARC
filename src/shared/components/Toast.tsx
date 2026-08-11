import { useEffect } from 'react'

type ToastProps = {
  message: string
  open: boolean
  onClose: () => void
}

export function Toast({ message, open, onClose }: ToastProps) {
  useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(onClose, 3000)
    return () => window.clearTimeout(timer)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed bottom-4 right-4 rounded-3xl bg-slate-900 px-4 py-3 text-white shadow-premium">
      {message}
    </div>
  )
}
