import { useMemo } from 'react'
import { useSupabaseCollection } from '@/hooks/useSupabaseData'
import { departmentsService, eventsService, newsService, projectsService, staffService } from '@/services/supabaseService'
import { Card } from '@/components/ui/Card'

export default function DashboardPage() {
  const { data: staff = [] } = useSupabaseCollection('dashboard-staff', () => staffService.list())
  const { data: departments = [] } = useSupabaseCollection('dashboard-departments', () => departmentsService.list())
  const { data: projects = [] } = useSupabaseCollection('dashboard-projects', () => projectsService.list())
  const { data: news = [] } = useSupabaseCollection('dashboard-news', () => newsService.list())
  const { data: events = [] } = useSupabaseCollection('dashboard-events', () => eventsService.list())

  const stats = useMemo(
    () => [
      { label: 'Staff records', value: staff.length },
      { label: 'Departments', value: departments.length },
      { label: 'Active projects', value: projects.length },
      { label: 'News items', value: news.length },
      { label: 'Events', value: events.length },
    ],
    [staff.length, departments.length, projects.length, news.length, events.length],
  )

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8 text-white shadow-sm">
        <h1 className="text-3xl font-semibold">Admin dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">Overview of core Supabase-backed records and pending activities.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => (
          <Card key={item.label} className="space-y-3 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
            <p className="text-4xl font-semibold text-slate-900">{item.value}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
