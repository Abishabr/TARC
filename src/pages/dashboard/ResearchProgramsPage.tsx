import { z } from 'zod'
import ModulePage from '@/components/layout/ModulePage'
import { useSupabaseCollection, useSupabaseMutation } from '@/hooks/useSupabaseData'
import { researchProgramsService } from '@/services/supabaseService'
import type { ResearchProgramRecord } from '@/types/domain'

const schema = z.object({
  title: z.string().min(2, 'Title is required'),
  manager: z.string().optional(),
  focus: z.string().optional(),
  status: z.string().min(2, 'Status is required'),
})

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'manager', label: 'Manager' },
  { key: 'focus', label: 'Focus' },
  { key: 'status', label: 'Status' },
]

const formFields = [
  { name: 'title', label: 'Title', placeholder: 'Sustainable agriculture research' },
  { name: 'manager', label: 'Manager', placeholder: 'Dr. Amina' },
  { name: 'focus', label: 'Focus', placeholder: 'Crop resilience' },
  { name: 'status', label: 'Status', placeholder: 'Active' },
]

export default function ResearchProgramsPage() {
  const { data: items = [], isLoading } = useSupabaseCollection<ResearchProgramRecord>('research_programs', () => researchProgramsService.list({ orderBy: 'title', ascending: true }))
  const createMutation = useSupabaseMutation<ResearchProgramRecord, Partial<ResearchProgramRecord>>(['research_programs'], (payload) => researchProgramsService.create(payload))
  const updateMutation = useSupabaseMutation<ResearchProgramRecord, { id: string; payload: Partial<ResearchProgramRecord> }>(['research_programs'], ({ id, payload }) => researchProgramsService.update(id, payload))
  const deleteMutation = useSupabaseMutation<boolean, string>(['research_programs'], (id) => researchProgramsService.remove(id))

  const handleSave = async (payload: Record<string, unknown>, id?: string) => {
    const recordPayload: Partial<ResearchProgramRecord> = {
      title: String(payload.title ?? ''),
      manager: payload.manager ? String(payload.manager) : undefined,
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
    <ModulePage<ResearchProgramRecord>
      title="Research Programs"
      subtitle="Manage research programs, their leadership, and status across the center."
      breadcrumb={['Admin', 'Research programs']}
      items={items}
      columns={columns}
      addLabel="Add research program"
      formTitle="Add research program"
      formDescription="Create new programs and update program details."
      formFields={formFields}
      formSchema={schema}
      initialValues={{ title: '', manager: '', focus: '', status: 'Active' }}
      loading={isLoading}
      onSubmit={handleSave}
      onDelete={handleDelete}
      saveLabel="Save program"
    />
  )
}
