import { z } from 'zod'
import { Badge } from '@/components/ui/Badge'
import ModulePage from '@/components/layout/ModulePage'

const schema = z.object({
  title: z.string().min(2, 'Title is required'),
  category: z.string().min(2, 'Category is required'),
  uploadDate: z.string().min(2, 'Upload date is required'),
  visibility: z.string().min(2, 'Visibility is required'),
})

const items = [
  { title: 'Community outreach', category: 'Events', uploadDate: 'Jul 05', visibility: 'Public' },
  { title: 'Training room', category: 'Facilities', uploadDate: 'Jun 18', visibility: 'Private' },
  { title: 'Research showcase', category: 'Programs', uploadDate: 'Jun 02', visibility: 'Public' },
]

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'uploadDate', label: 'Uploaded' },
  {
    key: 'visibility',
    label: 'Visibility',
    render: (item: { visibility: string }) => <Badge variant={item.visibility === 'Public' ? 'success' : 'warning'}>{item.visibility}</Badge>,
  },
]

const formFields = [
  { name: 'title', label: 'Image title', placeholder: 'e.g. Community outreach' },
  { name: 'category', label: 'Category', placeholder: 'e.g. Events' },
  { name: 'uploadDate', label: 'Upload date', placeholder: 'e.g. Jul 05' },
  { name: 'visibility', label: 'Visibility', type: 'select' as const, options: [{ label: 'Public', value: 'Public' }, { label: 'Private', value: 'Private' }] },
]

export default function GalleryPage() {
  return (
    <ModulePage
      title="Gallery"
      subtitle="Organize media collections and enrich the public-facing visual archive."
      breadcrumb={['Admin', 'Gallery']}
      items={items}
      columns={columns}
      addLabel="Upload gallery"
      formTitle="Add gallery item"
      formDescription="Prepare a media entry and set its visibility."
      formFields={formFields}
      formSchema={schema}
      initialValues={{ title: '', category: '', uploadDate: '', visibility: 'Public' }}
    />
  )
}
