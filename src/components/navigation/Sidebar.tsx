import {
  BookOpenText,
  Building2,
  CalendarDays,
  FolderKanban,
  FlaskConical,
  Images,
  LayoutGrid,
  LogOut,
  MessageSquareText,
  Newspaper,
  Settings2,
  Truck,
  UserCircle2,
  Users,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

type SidebarProps = {
  open: boolean
  onClose: () => void
}

const items = [
  { name: 'Dashboard', href: '/admin', icon: LayoutGrid },
  { name: 'Staff', href: '/admin/staff', icon: Users },
  { name: 'Departments', href: '/admin/departments', icon: Building2 },
  { name: 'Research Programs', href: '/admin/research-programs', icon: FlaskConical },
  { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { name: 'Publications', href: '/admin/publications', icon: BookOpenText },
  { name: 'News', href: '/admin/news', icon: Newspaper },
  { name: 'Events', href: '/admin/events', icon: CalendarDays },
  { name: 'Gallery', href: '/admin/gallery', icon: Images },
  { name: 'Vehicles', href: '/admin/vehicles', icon: Truck },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquareText },
  { name: 'Settings', href: '/admin/settings', icon: Settings2 },
  { name: 'Profile', href: '/admin/profile', icon: UserCircle2 },
]

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <aside className={cn('fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white px-4 py-6 shadow-sm transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0', open ? 'translate-x-0' : '-translate-x-full')}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Modules</p>
          <p className="text-sm text-slate-500">Management suite</p>
        </div>
        <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 p-2 text-slate-500 lg:hidden">
          ×
        </button>
      </div>

      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition',
                  isActive ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                )
              }
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-900">Need a quick handoff?</p>
        <p className="mt-1 text-sm text-slate-500">Review pending updates and action items from the dashboard.</p>
        <button className="mt-4 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm font-medium text-slate-700">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </aside>
  )
}
