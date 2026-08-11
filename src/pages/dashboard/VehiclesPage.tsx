import { z } from 'zod'
import ModulePage from '@/components/layout/ModulePage'
import { useSupabaseCollection, useSupabaseMutation } from '@/hooks/useSupabaseData'
import { vehiclesService } from '@/services/supabaseService'
import type { VehicleRecord } from '@/types/domain'

const schema = z.object({
  plate: z.string().min(2, 'Plate number is required'),
  driver: z.string().optional(),
  department: z.string().optional(),
  status: z.string().min(2, 'Status is required'),
})

const columns = [
  { key: 'plate', label: 'Plate' },
  { key: 'driver', label: 'Driver' },
  { key: 'department', label: 'Department' },
  { key: 'status', label: 'Status' },
]

const formFields = [
  { name: 'plate', label: 'Plate', placeholder: 'ABC-1234' },
  { name: 'driver', label: 'Driver', placeholder: 'Samuel' },
  { name: 'department', label: 'Department', placeholder: 'Logistics' },
  { name: 'status', label: 'Status', placeholder: 'In service' },
]

export default function VehiclesPage() {
  const { data: items = [], isLoading } = useSupabaseCollection<VehicleRecord>('vehicles', () => vehiclesService.list({ orderBy: 'plate', ascending: true }))
  const createMutation = useSupabaseMutation<VehicleRecord, Partial<VehicleRecord>>(['vehicles'], (payload) => vehiclesService.create(payload))
  const updateMutation = useSupabaseMutation<VehicleRecord, { id: string; payload: Partial<VehicleRecord> }>(['vehicles'], ({ id, payload }) => vehiclesService.update(id, payload))
  const deleteMutation = useSupabaseMutation<boolean, string>(['vehicles'], (id) => vehiclesService.remove(id))

  const handleSave = async (payload: Record<string, unknown>, id?: string) => {
    const recordPayload: Partial<VehicleRecord> = {
      plate: String(payload.plate ?? ''),
      driver: payload.driver ? String(payload.driver) : undefined,
      department: payload.department ? String(payload.department) : undefined,
      status: String(payload.status ?? 'In service'),
    }

    if (id) {
      await updateMutation.mutateAsync({ id, payload: recordPayload })
      return
    }

    await createMutation.mutateAsync(recordPayload)
  }

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id)
  }

  return (
    <ModulePage<VehicleRecord>
      title="Vehicles"
      subtitle="Track the center's fleet, drivers, and vehicle status in one panel."
      breadcrumb={['Admin', 'Vehicles']}
      items={items}
      columns={columns}
      addLabel="Add vehicle"
      formTitle="Add vehicle"
      formDescription="Register vehicles and assign departments with status tracking."
      formFields={formFields}
      formSchema={schema}
      initialValues={{ plate: '', driver: '', department: '', status: 'In service' }}
      loading={isLoading}
      onSubmit={handleSave}
      onDelete={handleDelete}
      saveLabel="Save vehicle"
    />
  )
}
