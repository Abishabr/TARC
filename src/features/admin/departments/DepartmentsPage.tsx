import { z } from 'zod'
import { Badge } from '@/components/ui/Badge'
import ModulePage from '@/components/layout/ModulePage'

const schema = z.object({
  name: z.string().min(2, 'Department name is required'),
  lead: z.string().min(2, 'Lead is required'),
  focus: z.string().min(2, 'Focus area is required'),
  status: z.string().min(2, 'Status is required'),
})

const items = [
  { name: 'Research & Innovation', lead: 'Dr. Halima Bako', focus: 'Programs', status: 'Active' },
  { name: 'Admissions', lead: 'Mr. Musa Ibrahim', focus: 'Student services', status: 'Active' },
  { name: 'Finance', lead: 'Mrs. Aisha Kure', focus: 'Budgeting', status: 'Review' },
]

const columns = [
  { key: 'name', label: 'Department' },
  { key: 'lead', label: 'Lead' },
  { key: 'focus', label: 'Focus' },
  {
    key: 'status',
    label: 'Status',
    render: (item: { status: string }) => <Badge variant={item.status === 'Active' ? 'success' : 'warning'}>{item.status}</Badge>,
  },
]

const formFields = [
  { name: 'name', label: 'Department name', placeholder: 'e.g. Finance' },
  { name: 'lead', label: 'Head of department', placeholder: 'e.g. Mrs. Aisha Kure' },
  { name: 'focus', label: 'Primary focus', placeholder: 'e.g. Budgeting' },
  { name: 'status', label: 'Status', type: 'select' as const, options: [{ label: 'Active', value: 'Active' }, { label: 'Review', value: 'Review' }] },
]

export default function DepartmentsPage() {
  return (
    <ModulePage
      title="Departments"
      subtitle="Keep departmental operations, leads, and focus areas visible for leadership review."
      breadcrumb={['Admin', 'Departments']}
      items={items}
      columns={columns}
      addLabel="Add department"
      formTitle="Add department"
      formDescription="Draft a departmental profile for planning and presentation."
      formFields={formFields}
      formSchema={schema}
      initialValues={{ name: '', lead: '', focus: '', status: 'Active' }}
    />
  )
}
