import { z } from 'zod'
import ModulePage from '@/components/layout/ModulePage'
import { useSupabaseCollection, useSupabaseMutation } from '@/hooks/useSupabaseData'
import { galleryService } from '@/services/supabaseService'
import { uploadFile, getPublicUrl } from '@/services/storageService'
import type { GalleryRecord } from '@/types/domain'

const schema = z.object({
  title: z.string().min(2, 'Title is required'),
  category: z.string().min(2, 'Category is required'),
  upload_date: z.string().optional(),
  visibility: z.string().min(2, 'Visibility is required'),
  image_file: z.any().optional(),
})

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'upload_date', label: 'Upload date' },
  { key: 'visibility', label: 'Visibility' },
]

const formFields = [
  { name: 'title', label: 'Title', placeholder: 'Center opening event' },
  { name: 'category', label: 'Category', placeholder: 'Event' },
  { name: 'upload_date', label: 'Upload date', type: 'date' },
  { name: 'visibility', label: 'Visibility', placeholder: 'Public' },
  { name: 'image_file', label: 'Gallery image', type: 'file' },
]

export default function GalleryPage() {
  const { data: items = [], isLoading } = useSupabaseCollection<GalleryRecord>('gallery', () => galleryService.list({ orderBy: 'created_at', ascending: false }))
  const createMutation = useSupabaseMutation<GalleryRecord, Partial<GalleryRecord>>(['gallery'], (payload) => galleryService.create(payload))
  const updateMutation = useSupabaseMutation<GalleryRecord, { id: string; payload: Partial<GalleryRecord> }>(['gallery'], ({ id, payload }) => galleryService.update(id, payload))
  const deleteMutation = useSupabaseMutation<boolean, string>(['gallery'], (id) => galleryService.remove(id))

  const handleSave = async (payload: Record<string, unknown>, id?: string) => {
    const file = payload.image_file as File | undefined
    const recordPayload: Partial<GalleryRecord> = {
      title: String(payload.title ?? ''),
      category: String(payload.category ?? ''),
      upload_date: payload.upload_date ? String(payload.upload_date) : undefined,
      visibility: String(payload.visibility ?? 'Public'),
    }

    if (file instanceof File) {
      const path = `gallery/${Date.now()}-${file.name}`
      await uploadFile('gallery', path, file)
      recordPayload.image_url = getPublicUrl('gallery', path)
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
    <ModulePage<GalleryRecord>
      title="Gallery"
      subtitle="Manage gallery visuals and publish new images to your public media feed."
      breadcrumb={['Admin', 'Gallery']}
      items={items}
      columns={columns}
      addLabel="Add gallery item"
      formTitle="Add gallery item"
      formDescription="Upload new gallery photos and set visibility."
      formFields={formFields}
      formSchema={schema}
      initialValues={{ title: '', category: '', upload_date: '', visibility: 'Public' }}
      loading={isLoading}
      onSubmit={handleSave}
      onDelete={handleDelete}
      saveLabel="Save gallery item"
    />
  )
}
