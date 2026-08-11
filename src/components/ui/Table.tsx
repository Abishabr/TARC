import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Table({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('overflow-x-auto rounded-2xl border border-slate-200 bg-white', className)}><table className="min-w-full divide-y divide-slate-200">{children}</table></div>
}

export function TableHead({ children }: { children: ReactNode }) {
  return <thead className="bg-slate-50">{children}</thead>
}

export function TableHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <th className={cn('px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500', className)}>{children}</th>
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-slate-100 bg-white">{children}</tbody>
}

export function TableRow({ children, className }: { children: ReactNode; className?: string }) {
  return <tr className={cn('hover:bg-slate-50', className)}>{children}</tr>
}

export function TableCell({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={cn('px-4 py-3 text-sm text-slate-700', className)}>{children}</td>
}
