import { z } from 'zod'
import ModulePage from '@/components/layout/ModulePage'
import { useSupabaseCollection, useSupabaseMutation } from '@/hooks/useSupabaseData'
import { departmentsService } from '@/services/supabaseService'
import type { DepartmentRecord } from '@/types/domain'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  lead: z.string().optional(),
  focus: z.string().optional(),
  status: z.string().min(2, 'Status is required'),
})

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'lead', label: 'Lead' },
  { key: 'focus', label: 'Focus' },
  { key: 'status', label: 'Status' },
]

const formFields = [
  { name: 'name', label: 'Name', placeholder: 'Research and development' },
  { name: 'lead', label: 'Lead', placeholder: 'Dr. Ibrahim' },
  { name: 'focus', label: 'Focus', placeholder: 'Innovation strategy' },
  { name: 'status', label: 'Status', placeholder: 'Active' },
]

export default function DepartmentsPage() {
  const { data: items = [], isLoading } = useSupabaseCollection<DepartmentRecord>('departments', () => departmentsService.list({ orderBy: 'name', ascending: true }))
  const createMutation = useSupabaseMutation<DepartmentRecord, Partial<DepartmentRecord>>(['departments'], (payload) => departmentsService.create(payload))
  const updateMutation = useSupabaseMutation<DepartmentRecord, { id: string; payload: Partial<DepartmentRecord> }>(['departments'], ({ id, payload }) => departmentsService.update(id, payload))
  const deleteMutation = useSupabaseMutation<boolean, string>(['departments'], (id) => departmentsService.remove(id))

  const handleSave = async (payload: Record<string, unknown>, id?: string) => {
    const recordPayload: Partial<DepartmentRecord> = {
      name: String(payload.name ?? ''),
      lead: payload.lead ? String(payload.lead) : undefined,
      focus: payload.focus ? String(payload.focus) : undefined,
      status: String(payload.status ?? 'Active'),
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
    <ModulePage<DepartmentRecord>
      title="Departments"
      subtitle="Manage center departments and their leadership assignments."
      breadcrumb={['Admin', 'Departments']}
      items={items}
      columns={columns}
      addLabel="Add department"
      formTitle="Add department"
      formDescription="Create and update departments with focus details."
      formFields={formFields}
      formSchema={schema}
      initialValues={{ name: '', lead: '', focus: '', status: 'Active' }}
      loading={isLoading}
      onSubmit={handleSave}
      onDelete={handleDelete}
      saveLabel="Save department"
    />
  )
}
