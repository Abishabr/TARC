import { Bell, Menu, Search, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

type HeaderProps = {
  onToggleSidebar?: () => void
}

export function Header({ onToggleSidebar = () => undefined }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onToggleSidebar} className="rounded-xl border border-slate-200 p-2 text-slate-600 lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/admin" className="flex items-center gap-2">
            <div className="rounded-2xl bg-primary/10 p-2 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">TARCMS</p>
              <p className="text-xs text-slate-500">Administration</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <label className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 md:flex">
            <Search className="h-4 w-4" />
            <input placeholder="Search" className="w-28 bg-transparent outline-none sm:w-40" />
          </label>
          <button type="button" className="rounded-2xl border border-slate-200 p-2 text-slate-600">
            <Bell className="h-5 w-5" />
          </button>
          <Link to="/admin/profile" className="flex items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">AD</div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-slate-800">Admin</p>
              <p className="text-xs text-slate-500">System Lead</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}
