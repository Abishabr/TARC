import { z } from 'zod'
import ModulePage from '@/components/layout/ModulePage'
import { useSupabaseCollection, useSupabaseMutation } from '@/hooks/useSupabaseData'
import { staffService } from '@/services/supabaseService'
import { uploadFile, getPublicUrl } from '@/services/storageService'
import type { StaffRecord } from '@/types/domain'

const schema = z.object({
  first_name: z.string().min(2, 'First name is required'),
  last_name: z.string().min(2, 'Last name is required'),
  role: z.string().min(2, 'Role is required'),
  department: z.string().min(2, 'Department is required'),
  status: z.string().min(2, 'Status is required'),
  email: z.string().email('Valid email is required').or(z.literal('')).optional(),
  avatar_file: z.any().optional(),
})

const columns = [
  { key: 'first_name', label: 'First name' },
  { key: 'last_name', label: 'Last name' },
  { key: 'role', label: 'Role' },
  { key: 'department', label: 'Department' },
  { key: 'status', label: 'Status' },
]

const formFields = [
  { name: 'first_name', label: 'First name', placeholder: 'Amina' },
  { name: 'last_name', label: 'Last name', placeholder: 'Yusuf' },
  { name: 'role', label: 'Role', placeholder: 'Registrar' },
  { name: 'department', label: 'Department', placeholder: 'Administration' },
  { name: 'status', label: 'Status', placeholder: 'Active' },
  { name: 'email', label: 'Email address', type: 'email', placeholder: 'name@tarc.gov' },
  { name: 'avatar_file', label: 'Profile photo', type: 'file' },
]

export default function StaffPage() {
  const { data: items = [], isLoading } = useSupabaseCollection<StaffRecord>('staff', () => staffService.list({ orderBy: 'first_name', ascending: true }))
  const createMutation = useSupabaseMutation<StaffRecord, Partial<StaffRecord>>(['staff'], (payload) => staffService.create(payload))
  const updateMutation = useSupabaseMutation<StaffRecord, { id: string; payload: Partial<StaffRecord> }>(['staff'], ({ id, payload }) => staffService.update(id, payload))
  const deleteMutation = useSupabaseMutation<boolean, string>(['staff'], (id) => staffService.remove(id))

  const handleSave = async (payload: Record<string, unknown>, id?: string) => {
    const file = payload.avatar_file as File | undefined
    const recordPayload: Partial<StaffRecord> = {
      first_name: String(payload.first_name ?? ''),
      last_name: String(payload.last_name ?? ''),
      role: String(payload.role ?? ''),
      department: String(payload.department ?? ''),
      status: String(payload.status ?? 'Active'),
      email: payload.email ? String(payload.email) : undefined,
    }

    if (file instanceof File) {
      const path = `staff-images/${Date.now()}-${file.name}`
      await uploadFile('staff-images', path, file)
      recordPayload.avatar_url = getPublicUrl('staff-images', path)
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
    <ModulePage<StaffRecord>
      title="Staff"
      subtitle="Manage staff profiles, department assignments, and availability in one place."
      breadcrumb={['Admin', 'Staff']}
      items={items}
      columns={columns}
      addLabel="Add staff"
      formTitle="Add staff member"
      formDescription="Create or update staff records with optional profile photos."
      formFields={formFields}
      formSchema={schema}
      initialValues={{ first_name: '', last_name: '', role: '', department: '', status: 'Active', email: '' }}
      loading={isLoading}
      onSubmit={handleSave}
      onDelete={handleDelete}
      saveLabel="Save staff"
    />
  )
}
