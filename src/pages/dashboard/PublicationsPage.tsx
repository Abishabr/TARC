import { z } from 'zod'
import ModulePage from '@/components/layout/ModulePage'
import { useSupabaseCollection, useSupabaseMutation } from '@/hooks/useSupabaseData'
import { publicationsService } from '@/services/supabaseService'
import { uploadFile, getPublicUrl } from '@/services/storageService'
import type { PublicationRecord } from '@/types/domain'

const schema = z.object({
  title: z.string().min(2, 'Title is required'),
  author: z.string().min(2, 'Author is required'),
  category: z.string().min(2, 'Category is required'),
  status: z.string().min(2, 'Status is required'),
  publication_file: z.any().optional(),
})

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'author', label: 'Author' },
  { key: 'category', label: 'Category' },
  { key: 'status', label: 'Status' },
]

const formFields = [
  { name: 'title', label: 'Title', placeholder: 'Annual research summary' },
  { name: 'author', label: 'Author', placeholder: 'Jane Doe' },
  { name: 'category', label: 'Category', placeholder: 'Report' },
  { name: 'status', label: 'Status', placeholder: 'Draft' },
  { name: 'publication_file', label: 'Publication file', type: 'file' },
]

export default function PublicationsPage() {
  const { data: items = [], isLoading } = useSupabaseCollection<PublicationRecord>('publications', () => publicationsService.list({ orderBy: 'created_at', ascending: false }))
  const createMutation = useSupabaseMutation<PublicationRecord, Partial<PublicationRecord>>(['publications'], (payload) => publicationsService.create(payload))
  const updateMutation = useSupabaseMutation<PublicationRecord, { id: string; payload: Partial<PublicationRecord> }>(['publications'], ({ id, payload }) => publicationsService.update(id, payload))
  const deleteMutation = useSupabaseMutation<boolean, string>(['publications'], (id) => publicationsService.remove(id))

  const handleSave = async (payload: Record<string, unknown>, id?: string) => {
    const file = payload.publication_file as File | undefined
    const recordPayload: Partial<PublicationRecord> = {
      title: String(payload.title ?? ''),
      author: String(payload.author ?? ''),
      category: String(payload.category ?? ''),
      status: String(payload.status ?? 'Draft'),
    }

    if (file instanceof File) {
      const path = `publications/${Date.now()}-${file.name}`
      await uploadFile('publications', path, file)
      recordPayload.file_url = getPublicUrl('publications', path)
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
    <ModulePage<PublicationRecord>
      title="Publications"
      subtitle="Manage publications and attach reference files for fast distribution."
      breadcrumb={['Admin', 'Publications']}
      items={items}
      columns={columns}
      addLabel="Add publication"
      formTitle="Add publication"
      formDescription="Upload publication files and track editorial status."
      formFields={formFields}
      formSchema={schema}
      initialValues={{ title: '', author: '', category: '', status: 'Draft' }}
      loading={isLoading}
      onSubmit={handleSave}
      onDelete={handleDelete}
      saveLabel="Save publication"
    />
  )
}
