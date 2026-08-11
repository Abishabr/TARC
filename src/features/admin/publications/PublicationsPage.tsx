import { z } from 'zod'
import { Badge } from '@/components/ui/Badge'
import ModulePage from '@/components/layout/ModulePage'

const schema = z.object({
  title: z.string().min(2, 'Title is required'),
  author: z.string().min(2, 'Author is required'),
  category: z.string().min(2, 'Category is required'),
  status: z.string().min(2, 'Status is required'),
})

const items = [
  { title: 'Annual Report 2025', author: 'Dr. Halima', category: 'Report', status: 'Published' },
  { title: 'Policy Brief', author: 'Mr. Musa', category: 'Brief', status: 'Draft' },
  { title: 'Research Highlights', author: 'Mrs. Binta', category: 'Magazine', status: 'Review' },
]

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'author', label: 'Author' },
  { key: 'category', label: 'Category' },
  {
    key: 'status',
    label: 'Status',
    render: (item: { status: string }) => <Badge variant={item.status === 'Published' ? 'success' : 'warning'}>{item.status}</Badge>,
  },
]

const formFields = [
  { name: 'title', label: 'Publication title', placeholder: 'e.g. Annual Report 2025' },
  { name: 'author', label: 'Author', placeholder: 'e.g. Dr. Halima' },
  { name: 'category', label: 'Category', placeholder: 'e.g. Report' },
  { name: 'status', label: 'Status', type: 'select' as const, options: [{ label: 'Published', value: 'Published' }, { label: 'Draft', value: 'Draft' }, { label: 'Review', value: 'Review' }] },
]

export default function PublicationsPage() {
  return (
    <ModulePage
      title="Publications"
      subtitle="Present academic and institutional publications with a polished review experience."
      breadcrumb={['Admin', 'Publications']}
      items={items}
      columns={columns}
      addLabel="Add publication"
      formTitle="Add publication"
      formDescription="Draft a publication entry and preview its layout."
      formFields={formFields}
      formSchema={schema}
      initialValues={{ title: '', author: '', category: '', status: 'Draft' }}
    />
  )
}
