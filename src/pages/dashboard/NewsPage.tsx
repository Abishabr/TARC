import { z } from 'zod'
import ModulePage from '@/components/layout/ModulePage'
import { useSupabaseCollection, useSupabaseMutation } from '@/hooks/useSupabaseData'
import { newsService } from '@/services/supabaseService'
import type { NewsRecord } from '@/types/domain'

const schema = z.object({
  headline: z.string().min(2, 'Headline is required'),
  author: z.string().optional(),
  category: z.string().optional(),
  status: z.string().min(2, 'Status is required'),
})

const columns = [
  { key: 'headline', label: 'Headline' },
  { key: 'author', label: 'Author' },
  { key: 'category', label: 'Category' },
  { key: 'status', label: 'Status' },
]

const formFields = [
  { name: 'headline', label: 'Headline', placeholder: 'Center awarded new grant' },
  { name: 'author', label: 'Author', placeholder: 'Press team' },
  { name: 'category', label: 'Category', placeholder: 'Announcement' },
  { name: 'status', label: 'Status', placeholder: 'Draft' },
]

export default function NewsPage() {
  const { data: items = [], isLoading } = useSupabaseCollection<NewsRecord>('news', () => newsService.list({ orderBy: 'created_at', ascending: false }))
  const createMutation = useSupabaseMutation<NewsRecord, Partial<NewsRecord>>(['news'], (payload) => newsService.create(payload))
  const updateMutation = useSupabaseMutation<NewsRecord, { id: string; payload: Partial<NewsRecord> }>(['news'], ({ id, payload }) => newsService.update(id, payload))
  const deleteMutation = useSupabaseMutation<boolean, string>(['news'], (id) => newsService.remove(id))

  const handleSave = async (payload: Record<string, unknown>, id?: string) => {
    const recordPayload: Partial<NewsRecord> = {
      headline: String(payload.headline ?? ''),
      author: payload.author ? String(payload.author) : undefined,
      category: payload.category ? String(payload.category) : undefined,
      status: String(payload.status ?? 'Draft'),
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
    <ModulePage<NewsRecord>
      title="News"
      subtitle="Publish news items and track article status in the admin dashboard."
      breadcrumb={['Admin', 'News']}
      items={items}
      columns={columns}
      addLabel="Add news item"
      formTitle="Add news item"
      formDescription="Create news entries and update headlines quickly."
      formFields={formFields}
      formSchema={schema}
      initialValues={{ headline: '', author: '', category: '', status: 'Draft' }}
      loading={isLoading}
      onSubmit={handleSave}
      onDelete={handleDelete}
      saveLabel="Save news"
    />
  )
}
