import { ArrowRight, BookOpenText, CalendarDays, FolderKanban, Images, MessageSquareText, Newspaper, Plus, ShieldCheck, Truck, Users } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const statCards = [
  { title: 'Total Staff', value: '128', icon: Users, trend: '+8% this month' },
  { title: 'Departments', value: '14', icon: ShieldCheck, trend: 'Stable' },
  { title: 'Research Programs', value: '9', icon: BookOpenText, trend: '3 active' },
  { title: 'Projects', value: '26', icon: FolderKanban, trend: '6 in review' },
  { title: 'Publications', value: '41', icon: Newspaper, trend: 'New this week' },
  { title: 'News', value: '18', icon: CalendarDays, trend: 'Updated daily' },
  { title: 'Events', value: '12', icon: CalendarDays, trend: '3 upcoming' },
  { title: 'Gallery Images', value: '842', icon: Images, trend: '+24 today' },
  { title: 'Vehicles', value: '11', icon: Truck, trend: '2 in service' },
  { title: 'Messages', value: '76', icon: MessageSquareText, trend: '12 unread' },
]

const activity = [
  { title: 'New staff profile approved', meta: '10 mins ago', detail: 'Admissions office onboarding complete' },
  { title: 'Project milestone updated', meta: '42 mins ago', detail: 'Research program timeline reviewed' },
  { title: 'Gallery upload accepted', meta: '1 hr ago', detail: 'Community outreach album published' },
]

const quickActions = ['Add Staff', 'Add Project', 'Add Publication', 'Add News', 'Upload Gallery', 'Add Vehicle']

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-300">TARCMS Control Center</p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Welcome back, operations lead.</h1>
            <p className="mt-3 text-sm text-slate-300 sm:text-base">Monitor institutional performance, manage records, and keep the center moving with a polished administrative workspace.</p>
          </div>
          <Button variant="secondary" className="border-slate-700 bg-white/10 text-white hover:bg-white/20">
            <Plus className="mr-2 h-4 w-4" /> Quick action
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title} className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">{card.title}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{card.value}</p>
                <p className="mt-2 text-sm text-primary">{card.trend}</p>
              </div>
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <Icon className="h-5 w-5" />
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <Card title="Recent Activity" subtitle="A snapshot of recent administrative progress">
          <div className="space-y-4">
            {activity.map((item) => (
              <div key={item.title} className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div>
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                </div>
                <Badge variant="info">{item.meta}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Quick Actions" subtitle="Jump into common tasks">
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action) => (
              <Button key={action} variant="secondary" className="rounded-full">
                {action}
              </Button>
            ))}
          </div>
          <div className="mt-6 rounded-3xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
            <p className="font-medium text-slate-700">Operational summary</p>
            <p className="mt-2">A centralized workspace for upcoming reporting deadlines and submissions.</p>
            <Button variant="ghost" className="mt-4 px-0 text-primary">
              View full overview <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}
