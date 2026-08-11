import { Navigate, Outlet } from 'react-router-dom'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardLayout() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-screen items-center justify-center px-4 py-12">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-900">Checking session...</p>
            <p className="mt-2 text-sm text-slate-500">Please wait while we verify your access.</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate replace to="/auth/login" />
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
