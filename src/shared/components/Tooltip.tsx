import { type ReactNode, type HTMLAttributes } from 'react'
import { cn } from '../utils/cn'

type TooltipProps = HTMLAttributes<HTMLDivElement> & {
  content: string
  children: ReactNode
}

export function Tooltip({ content, children, className, ...props }: TooltipProps) {
  return (
    <div className={cn('group relative inline-flex', className)} {...props}>
      {children}
      <div className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-2xl bg-slate-900 px-3 py-2 text-xs text-white opacity-0 transition duration-200 group-hover:opacity-100">
        {content}
      </div>
    </div>
  )
}
