import { z } from 'zod'
import { Badge } from '@/components/ui/Badge'
import ModulePage from '@/components/layout/ModulePage'

const schema = z.object({
  plate: z.string().min(2, 'Plate number is required'),
  driver: z.string().min(2, 'Driver is required'),
  department: z.string().min(2, 'Department is required'),
  status: z.string().min(2, 'Status is required'),
})

const items = [
  { plate: 'TAR 101', driver: 'S. Musa', department: 'Operations', status: 'In service' },
  { plate: 'TAR 204', driver: 'K. Bawa', department: 'Research', status: 'Maintenance' },
  { plate: 'TAR 310', driver: 'A. Danjuma', department: 'Events', status: 'Available' },
]

const columns = [
  { key: 'plate', label: 'Plate' },
  { key: 'driver', label: 'Driver' },
  { key: 'department', label: 'Department' },
  {
    key: 'status',
    label: 'Status',
    render: (item: { status: string }) => <Badge variant={item.status === 'In service' ? 'success' : 'warning'}>{item.status}</Badge>,
  },
]

const formFields = [
  { name: 'plate', label: 'Plate number', placeholder: 'e.g. TAR 101' },
  { name: 'driver', label: 'Driver', placeholder: 'e.g. S. Musa' },
  { name: 'department', label: 'Department', placeholder: 'e.g. Operations' },
  { name: 'status', label: 'Status', type: 'select' as const, options: [{ label: 'In service', value: 'In service' }, { label: 'Maintenance', value: 'Maintenance' }, { label: 'Available', value: 'Available' }] },
]

export default function VehiclesPage() {
  return (
    <ModulePage
      title="Vehicles"
      subtitle="Track mobility assets, drivers, and maintenance readiness for operations teams."
      breadcrumb={['Admin', 'Vehicles']}
      items={items}
      columns={columns}
      addLabel="Add vehicle"
      formTitle="Add vehicle"
      formDescription="Create a vehicle record for the operations fleet."
      formFields={formFields}
      formSchema={schema}
      initialValues={{ plate: '', driver: '', department: '', status: 'In service' }}
    />
  )
}
