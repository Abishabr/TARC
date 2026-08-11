import { z } from 'zod'
import ModulePage from '@/components/layout/ModulePage'
import { useSupabaseCollection, useSupabaseMutation } from '@/hooks/useSupabaseData'
import { projectsService } from '@/services/supabaseService'
import { uploadFile, getPublicUrl } from '@/services/storageService'
import type { ProjectRecord } from '@/types/domain'

const schema = z.object({
  title: z.string().min(2, 'Title is required'),
  owner: z.string().min(2, 'Owner is required'),
  deadline: z.string().optional(),
  status: z.string().min(2, 'Status is required'),
  image_file: z.any().optional(),
})

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'owner', label: 'Owner' },
  { key: 'deadline', label: 'Deadline' },
  { key: 'status', label: 'Status' },
]

const formFields = [
  { name: 'title', label: 'Title', placeholder: 'Research oversight dashboard' },
  { name: 'owner', label: 'Owner', placeholder: 'Program manager' },
  { name: 'deadline', label: 'Deadline', type: 'date' },
  { name: 'status', label: 'Status', placeholder: 'In progress' },
  { name: 'image_file', label: 'Project image', type: 'file' },
]

export default function ProjectsPage() {
  const { data: items = [], isLoading } = useSupabaseCollection<ProjectRecord>('projects', () => projectsService.list({ orderBy: 'created_at', ascending: false }))
  const createMutation = useSupabaseMutation<ProjectRecord, Partial<ProjectRecord>>(['projects'], (payload) => projectsService.create(payload))
  const updateMutation = useSupabaseMutation<ProjectRecord, { id: string; payload: Partial<ProjectRecord> }>(['projects'], ({ id, payload }) => projectsService.update(id, payload))
  const deleteMutation = useSupabaseMutation<boolean, string>(['projects'], (id) => projectsService.remove(id))

  const handleSave = async (payload: Record<string, unknown>, id?: string) => {
    const file = payload.image_file as File | undefined
    const recordPayload: Partial<ProjectRecord> = {
      title: String(payload.title ?? ''),
      owner: String(payload.owner ?? ''),
      deadline: payload.deadline ? String(payload.deadline) : undefined,
      status: String(payload.status ?? 'In progress'),
    }

    if (file instanceof File) {
      const path = `documents/project-${Date.now()}-${file.name}`
      await uploadFile('documents', path, file)
      recordPayload.image_url = getPublicUrl('documents', path)
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
    <ModulePage<ProjectRecord>
      title="Projects"
      subtitle="Track research initiatives, deadlines, and project status across the center."
      breadcrumb={['Admin', 'Projects']}
      items={items}
      columns={columns}
      addLabel="Add project"
      formTitle="Add project"
      formDescription="Attach a project image and manage deadlines in one place."
      formFields={formFields}
      formSchema={schema}
      initialValues={{ title: '', owner: '', deadline: '', status: 'In progress' }}
      loading={isLoading}
      onSubmit={handleSave}
      onDelete={handleDelete}
      saveLabel="Save project"
    />
  )
}
