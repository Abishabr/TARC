import { cn } from '../utils/cn'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={cn('rounded-xl border border-neutral-300 px-3 py-2 text-sm', currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-100')}
      >
        Previous
      </button>
      <span className="text-sm text-neutral-600">
        Page {currentPage} of {totalPages}
      </span>
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={cn('rounded-xl border border-neutral-300 px-3 py-2 text-sm', currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-100')}
      >
        Next
      </button>
    </div>
  )
}
