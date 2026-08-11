import { type InputHTMLAttributes } from 'react'
import { Search } from 'lucide-react'
import { cn } from '../utils/cn'

type SearchBoxProps = InputHTMLAttributes<HTMLInputElement>

export function SearchBox({ className, placeholder = 'Search', ...props }: SearchBoxProps) {
  return (
    <label className={cn('flex items-center gap-3 rounded-2xl border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-700 shadow-soft', className)}>
      <Search className="h-4 w-4 text-neutral-500" />
      <input
        type="search"
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-neutral-400"
        {...props}
      />
    </label>
  )
}
