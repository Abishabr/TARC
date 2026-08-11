import { useState, type ReactNode } from 'react'
import { Header } from '../navigation/Header'
import { Sidebar } from '../navigation/Sidebar'

interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onToggleSidebar={() => setSidebarOpen((open) => !open)} />
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
