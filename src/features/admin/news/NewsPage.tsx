import { z } from 'zod'
import { Badge } from '@/components/ui/Badge'
import ModulePage from '@/components/layout/ModulePage'

const schema = z.object({
  headline: z.string().min(2, 'Headline is required'),
  author: z.string().min(2, 'Author is required'),
  category: z.string().min(2, 'Category is required'),
  status: z.string().min(2, 'Status is required'),
})

const items = [
  { headline: 'New policy launch', author: 'S. Bello', category: 'Announcement', status: 'Published' },
  { headline: 'Training event recap', author: 'M. Gambo', category: 'Update', status: 'Draft' },
  { headline: 'Leadership visit', author: 'R. Halim', category: 'Feature', status: 'Review' },
]

const columns = [
  { key: 'headline', label: 'Headline' },
  { key: 'author', label: 'Author' },
  { key: 'category', label: 'Category' },
  {
    key: 'status',
    label: 'Status',
    render: (item: { status: string }) => <Badge variant={item.status === 'Published' ? 'success' : 'warning'}>{item.status}</Badge>,
  },
]

const formFields = [
  { name: 'headline', label: 'Headline', placeholder: 'e.g. New policy launch' },
  { name: 'author', label: 'Author', placeholder: 'e.g. S. Bello' },
  { name: 'category', label: 'Category', placeholder: 'e.g. Announcement' },
  { name: 'status', label: 'Status', type: 'select' as const, options: [{ label: 'Published', value: 'Published' }, { label: 'Draft', value: 'Draft' }, { label: 'Review', value: 'Review' }] },
]

export default function NewsPage() {
  return (
    <ModulePage
      title="News"
      subtitle="Share institutional updates, media highlights, and public-facing announcements."
      breadcrumb={['Admin', 'News']}
      items={items}
      columns={columns}
      addLabel="Add news"
      formTitle="Add news item"
      formDescription="Draft a content update for the website preview."
      formFields={formFields}
      formSchema={schema}
      initialValues={{ headline: '', author: '', category: '', status: 'Draft' }}
    />
  )
}
