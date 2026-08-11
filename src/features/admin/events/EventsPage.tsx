import { z } from 'zod'
import { Badge } from '@/components/ui/Badge'
import ModulePage from '@/components/layout/ModulePage'

const schema = z.object({
  title: z.string().min(2, 'Event title is required'),
  date: z.string().min(2, 'Date is required'),
  venue: z.string().min(2, 'Venue is required'),
  status: z.string().min(2, 'Status is required'),
})

const items = [
  { title: 'Leadership Retreat', date: 'Aug 14', venue: 'Main Hall', status: 'Scheduled' },
  { title: 'Gallery Walkthrough', date: 'Sep 01', venue: 'Annex', status: 'Planning' },
  { title: 'Open Day', date: 'Sep 22', venue: 'Campus', status: 'Confirmed' },
]

const columns = [
  { key: 'title', label: 'Event' },
  { key: 'date', label: 'Date' },
  { key: 'venue', label: 'Venue' },
  {
    key: 'status',
    label: 'Status',
    render: (item: { status: string }) => <Badge variant={item.status === 'Scheduled' ? 'info' : 'warning'}>{item.status}</Badge>,
  },
]

const formFields = [
  { name: 'title', label: 'Event title', placeholder: 'e.g. Leadership Retreat' },
  { name: 'date', label: 'Date', placeholder: 'e.g. Aug 14' },
  { name: 'venue', label: 'Venue', placeholder: 'e.g. Main Hall' },
  { name: 'status', label: 'Status', type: 'select' as const, options: [{ label: 'Scheduled', value: 'Scheduled' }, { label: 'Planning', value: 'Planning' }, { label: 'Confirmed', value: 'Confirmed' }] },
]

export default function EventsPage() {
  return (
    <ModulePage
      title="Events"
      subtitle="Plan institutional events and coordinate schedules from a single dashboard."
      breadcrumb={['Admin', 'Events']}
      items={items}
      columns={columns}
      addLabel="Add event"
      formTitle="Add event"
      formDescription="Prepare an event entry for the public calendar."
      formFields={formFields}
      formSchema={schema}
      initialValues={{ title: '', date: '', venue: '', status: 'Scheduled' }}
    />
  )
}
