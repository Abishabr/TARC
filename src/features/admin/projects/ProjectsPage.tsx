import { z } from 'zod'
import { Badge } from '@/components/ui/Badge'
import ModulePage from '@/components/layout/ModulePage'

const schema = z.object({
  title: z.string().min(2, 'Project title is required'),
  owner: z.string().min(2, 'Owner is required'),
  deadline: z.string().min(2, 'Deadline is required'),
  status: z.string().min(2, 'Status is required'),
})

const items = [
  { title: 'Center Renewal', owner: 'A. Yusuf', deadline: 'Sep 2026', status: 'In progress' },
  { title: 'Digital Archiving', owner: 'B. Sani', deadline: 'Oct 2026', status: 'Review' },
  { title: 'Impacts Report', owner: 'C. Musa', deadline: 'Nov 2026', status: 'Planned' },
]

const columns = [
  { key: 'title', label: 'Project' },
  { key: 'owner', label: 'Owner' },
  { key: 'deadline', label: 'Deadline' },
  {
    key: 'status',
    label: 'Status',
    render: (item: { status: string }) => <Badge variant={item.status === 'In progress' ? 'info' : 'warning'}>{item.status}</Badge>,
  },
]

const formFields = [
  { name: 'title', label: 'Project title', placeholder: 'e.g. Center Renewal' },
  { name: 'owner', label: 'Project owner', placeholder: 'e.g. A. Yusuf' },
  { name: 'deadline', label: 'Deadline', placeholder: 'e.g. Sep 2026' },
  { name: 'status', label: 'Status', type: 'select' as const, options: [{ label: 'In progress', value: 'In progress' }, { label: 'Review', value: 'Review' }, { label: 'Planned', value: 'Planned' }] },
]

export default function ProjectsPage() {
  return (
    <ModulePage
      title="Projects"
      subtitle="Coordinate strategic initiatives and monitor project health with a clean executive view."
      breadcrumb={['Admin', 'Projects']}
      items={items}
      columns={columns}
      addLabel="Add project"
      formTitle="Add project"
      formDescription="Capture a new project idea and keep it visible to stakeholders."
      formFields={formFields}
      formSchema={schema}
      initialValues={{ title: '', owner: '', deadline: '', status: 'In progress' }}
    />
  )
}
