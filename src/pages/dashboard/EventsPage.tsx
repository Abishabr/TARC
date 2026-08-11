import { z } from 'zod'
import ModulePage from '@/components/layout/ModulePage'
import { useSupabaseCollection, useSupabaseMutation } from '@/hooks/useSupabaseData'
import { eventsService } from '@/services/supabaseService'
import type { EventRecord } from '@/types/domain'

const schema = z.object({
  title: z.string().min(2, 'Title is required'),
  date: z.string().optional(),
  venue: z.string().optional(),
  status: z.string().min(2, 'Status is required'),
})

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'date', label: 'Date' },
  { key: 'venue', label: 'Venue' },
  { key: 'status', label: 'Status' },
]

const formFields = [
  { name: 'title', label: 'Title', placeholder: 'Annual research conference' },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'venue', label: 'Venue', placeholder: 'Main auditorium' },
  { name: 'status', label: 'Status', placeholder: 'Scheduled' },
]

export default function EventsPage() {
  const { data: items = [], isLoading } = useSupabaseCollection<EventRecord>('events', () => eventsService.list({ orderBy: 'date', ascending: true }))
  const createMutation = useSupabaseMutation<EventRecord, Partial<EventRecord>>(['events'], (payload) => eventsService.create(payload))
  const updateMutation = useSupabaseMutation<EventRecord, { id: string; payload: Partial<EventRecord> }>(['events'], ({ id, payload }) => eventsService.update(id, payload))
  const deleteMutation = useSupabaseMutation<boolean, string>(['events'], (id) => eventsService.remove(id))

  const handleSave = async (payload: Record<string, unknown>, id?: string) => {
    const recordPayload: Partial<EventRecord> = {
      title: String(payload.title ?? ''),
      date: payload.date ? String(payload.date) : undefined,
      venue: payload.venue ? String(payload.venue) : undefined,
      status: String(payload.status ?? 'Scheduled'),
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
    <ModulePage<EventRecord>
      title="Events"
      subtitle="Schedule center events and keep attendees informed of upcoming activities."
      breadcrumb={['Admin', 'Events']}
      items={items}
      columns={columns}
      addLabel="Add event"
      formTitle="Add event"
      formDescription="Create event records with dates, venues, and status."
      formFields={formFields}
      formSchema={schema}
      initialValues={{ title: '', date: '', venue: '', status: 'Scheduled' }}
      loading={isLoading}
      onSubmit={handleSave}
      onDelete={handleDelete}
      saveLabel="Save event"
    />
  )
}
