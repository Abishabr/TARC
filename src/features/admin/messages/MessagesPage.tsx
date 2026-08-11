import { z } from 'zod'
import { Badge } from '@/components/ui/Badge'
import ModulePage from '@/components/layout/ModulePage'

const schema = z.object({
  sender: z.string().min(2, 'Sender is required'),
  subject: z.string().min(2, 'Subject is required'),
  priority: z.string().min(2, 'Priority is required'),
  status: z.string().min(2, 'Status is required'),
})

const items = [
  { sender: 'Director Office', subject: 'Quarterly review', priority: 'High', status: 'Unread' },
  { sender: 'Operations', subject: 'Vehicle request', priority: 'Medium', status: 'Seen' },
  { sender: 'Library', subject: 'Archive request', priority: 'Low', status: 'Resolved' },
]

const columns = [
  { key: 'sender', label: 'Sender' },
  { key: 'subject', label: 'Subject' },
  { key: 'priority', label: 'Priority' },
  {
    key: 'status',
    label: 'Status',
    render: (item: { status: string }) => <Badge variant={item.status === 'Unread' ? 'danger' : 'info'}>{item.status}</Badge>,
  },
]

const formFields = [
  { name: 'sender', label: 'Sender', placeholder: 'e.g. Operations' },
  { name: 'subject', label: 'Subject', placeholder: 'e.g. Vehicle request' },
  { name: 'priority', label: 'Priority', placeholder: 'e.g. High' },
  { name: 'status', label: 'Status', type: 'select' as const, options: [{ label: 'Unread', value: 'Unread' }, { label: 'Seen', value: 'Seen' }, { label: 'Resolved', value: 'Resolved' }] },
]

export default function MessagesPage() {
  return (
    <ModulePage
      title="Messages"
      subtitle="Prioritize internal communications and keep the communication workflow visible."
      breadcrumb={['Admin', 'Messages']}
      items={items}
      columns={columns}
      addLabel="Add message"
      formTitle="Add message"
      formDescription="Draft a communication record for the inbox view."
      formFields={formFields}
      formSchema={schema}
      initialValues={{ sender: '', subject: '', priority: 'Medium', status: 'Unread' }}
    />
  )
}
