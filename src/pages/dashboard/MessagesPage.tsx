import { z } from 'zod'
import ModulePage from '@/components/layout/ModulePage'
import { useSupabaseCollection, useSupabaseMutation } from '@/hooks/useSupabaseData'
import { messagesService } from '@/services/supabaseService'
import type { MessageRecord } from '@/types/domain'

const schema = z.object({
  sender: z.string().min(2, 'Sender is required'),
  subject: z.string().optional(),
  priority: z.string().min(2, 'Priority is required'),
  status: z.string().min(2, 'Status is required'),
})

const columns = [
  { key: 'sender', label: 'Sender' },
  { key: 'subject', label: 'Subject' },
  { key: 'priority', label: 'Priority' },
  { key: 'status', label: 'Status' },
]

const formFields = [
  { name: 'sender', label: 'Sender', placeholder: 'Jane Doe' },
  { name: 'subject', label: 'Subject', placeholder: 'Message subject' },
  { name: 'priority', label: 'Priority', placeholder: 'Medium' },
  { name: 'status', label: 'Status', placeholder: 'Unread' },
]

export default function MessagesPage() {
  const { data: items = [], isLoading } = useSupabaseCollection<MessageRecord>('messages', () => messagesService.list({ orderBy: 'created_at', ascending: false }))
  const createMutation = useSupabaseMutation<MessageRecord, Partial<MessageRecord>>(['messages'], (payload) => messagesService.create(payload))
  const updateMutation = useSupabaseMutation<MessageRecord, { id: string; payload: Partial<MessageRecord> }>(['messages'], ({ id, payload }) => messagesService.update(id, payload))
  const deleteMutation = useSupabaseMutation<boolean, string>(['messages'], (id) => messagesService.remove(id))

  const handleSave = async (payload: Record<string, unknown>, id?: string) => {
    const recordPayload: Partial<MessageRecord> = {
      sender: String(payload.sender ?? ''),
      subject: payload.subject ? String(payload.subject) : undefined,
      priority: String(payload.priority ?? 'Medium'),
      status: String(payload.status ?? 'Unread'),
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
    <ModulePage<MessageRecord>
      title="Messages"
      subtitle="Track incoming messages and internal correspondence from stakeholders."
      breadcrumb={['Admin', 'Messages']}
      items={items}
      columns={columns}
      addLabel="Add message"
      formTitle="Add message"
      formDescription="Log messages with priority and status for follow-up."
      formFields={formFields}
      formSchema={schema}
      initialValues={{ sender: '', subject: '', priority: 'Medium', status: 'Unread' }}
      loading={isLoading}
      onSubmit={handleSave}
      onDelete={handleDelete}
      saveLabel="Save message"
    />
  )
}
