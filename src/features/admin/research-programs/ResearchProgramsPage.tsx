import { z } from 'zod'
import { Badge } from '@/components/ui/Badge'
import ModulePage from '@/components/layout/ModulePage'

const schema = z.object({
  title: z.string().min(2, 'Title is required'),
  manager: z.string().min(2, 'Manager is required'),
  focus: z.string().min(2, 'Focus is required'),
  status: z.string().min(2, 'Status is required'),
})

const items = [
  { title: 'Digital Archives', manager: 'Dr. Amina Yusuf', focus: 'Preservation', status: 'Active' },
  { title: 'Community Outreach', manager: 'Mr. Sadiq Khan', focus: 'Engagement', status: 'Monitoring' },
  { title: 'Innovation Lab', manager: 'Dr. Nia Binta', focus: 'Pilot Programs', status: 'Planning' },
]

const columns = [
  { key: 'title', label: 'Program' },
  { key: 'manager', label: 'Manager' },
  { key: 'focus', label: 'Focus' },
  {
    key: 'status',
    label: 'Status',
    render: (item: { status: string }) => <Badge variant={item.status === 'Active' ? 'success' : 'info'}>{item.status}</Badge>,
  },
] as const

const formFields = [
  { name: 'title', label: 'Program title', placeholder: 'e.g. Digital Archives' },
  { name: 'manager', label: 'Program manager', placeholder: 'Lead person' },
  { name: 'focus', label: 'Program focus', placeholder: 'e.g. Preservation' },
  { name: 'status', label: 'Status', type: 'select' as const, options: [{ label: 'Active', value: 'Active' }, { label: 'Monitoring', value: 'Monitoring' }, { label: 'Planning', value: 'Planning' }] },
]

export default function ResearchProgramsPage() {
  return (
    <ModulePage
      title="Research Programs"
      subtitle="Track institutional initiatives, research priorities, and active program pipelines."
      breadcrumb={['Admin', 'Research Programs']}
      items={items}
      columns={columns}
      addLabel="Add program"
      formTitle="Add research program"
      formDescription="Draft a new research initiative without connecting to a backend."
      formFields={formFields}
      formSchema={schema}
      initialValues={{ title: '', manager: '', focus: '', status: 'Active' }}
    />
  )
}
