import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useAuth } from '@/hooks/useAuth'

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth/login', { replace: true })
    }
  }, [loading, user, navigate])

  return (
    <section className="space-y-6">
      <Card className="space-y-6 p-8">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Profile</h1>
          <p className="mt-2 text-sm text-slate-500">Manage your authenticated session and administrator profile details.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <p className="text-sm text-slate-500">Email</p>
            <p className="mt-2 text-lg font-medium text-slate-900">{user?.email ?? 'Not signed in'}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <p className="text-sm text-slate-500">User ID</p>
            <p className="mt-2 text-lg font-medium text-slate-900">{user?.id ?? 'N/A'}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            variant="secondary"
            onClick={async () => {
              await signOut()
              navigate('/auth/login', { replace: true })
            }}
          >
            Sign out
          </Button>
        </div>
      </Card>
    </section>
  )
}
