import { z } from 'zod'
import { Badge } from '@/components/ui/Badge'
import ModulePage from '@/components/layout/ModulePage'

const schema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  role: z.string().min(2, 'Role is required'),
  department: z.string().min(2, 'Department is required'),
  email: z.string().email('Valid email is required'),
})

const items = [
  { name: 'Amina Yusuf', role: 'Registrar', department: 'Admissions', status: 'Active' },
  { name: 'Khalid Nuhu', role: 'Program Officer', department: 'Research', status: 'On leave' },
  { name: 'Binta Sani', role: 'Data Manager', department: 'Administration', status: 'Active' },
]

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'department', label: 'Department' },
  {
    key: 'status',
    label: 'Status',
    render: (item: { status: string }) => <Badge variant={item.status === 'Active' ? 'success' : 'warning'}>{item.status}</Badge>,
  },
]

const formFields = [
  { name: 'firstName', label: 'First name', placeholder: 'e.g. Amina' },
  { name: 'lastName', label: 'Last name', placeholder: 'e.g. Yusuf' },
  { name: 'role', label: 'Role', placeholder: 'e.g. Registrar' },
  { name: 'department', label: 'Department', placeholder: 'e.g. Administration' },
  { name: 'email', label: 'Email address', type: 'email' as const, placeholder: 'name@tarc.gov' },
]

export default function StaffPage() {
  return (
    <ModulePage
      title="Staff"
      subtitle="Manage human resources records, roles, and staff availability in one streamlined workspace."
      breadcrumb={['Admin', 'Staff']}
      items={items}
      columns={columns}
      addLabel="Add staff"
      formTitle="Add staff member"
      formDescription="Create a polished staff entry without connecting data services."
      formFields={formFields}
      formSchema={schema}
      initialValues={{ firstName: '', lastName: '', role: '', department: '', email: '' }}
    />
  )
}
