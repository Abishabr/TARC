import { z } from 'zod'
import ModulePage from '@/components/layout/ModulePage'
import { useSupabaseCollection, useSupabaseMutation } from '@/hooks/useSupabaseData'
import { settingsService } from '@/services/supabaseService'
import { uploadFile, getPublicUrl } from '@/services/storageService'
import type { SettingsRecord } from '@/types/domain'

const schema = z.object({
  center_name: z.string().min(2, 'Center name is required'),
  tagline: z.string().optional(),
  language: z.string().optional(),
  timezone: z.string().optional(),
  website_title: z.string().optional(),
  maintenance_mode: z.string().optional(),
  facebook: z.string().optional(),
  linkedin: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Valid email is required').or(z.literal('')).optional(),
  address: z.string().optional(),
  logo_file: z.any().optional(),
})

const columns = [
  { key: 'center_name', label: 'Center name' },
  { key: 'website_title', label: 'Website title' },
  { key: 'language', label: 'Language' },
  { key: 'timezone', label: 'Timezone' },
]

const formFields = [
  { name: 'center_name', label: 'Center name', placeholder: 'TARC Research Center' },
  { name: 'tagline', label: 'Tagline', placeholder: 'Innovation in action' },
  { name: 'language', label: 'Language', placeholder: 'English' },
  { name: 'timezone', label: 'Timezone', placeholder: 'GMT+1' },
  { name: 'website_title', label: 'Website title', placeholder: 'TARC CMS' },
  { name: 'maintenance_mode', label: 'Maintenance mode', placeholder: 'Off' },
  { name: 'facebook', label: 'Facebook URL', placeholder: 'https://facebook.com/...' },
  { name: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/...' },
  { name: 'phone', label: 'Phone', placeholder: '+234 000 000 0000' },
  { name: 'email', label: 'Email address', type: 'email', placeholder: 'info@tarc.gov' },
  { name: 'address', label: 'Address', placeholder: '123 Research Avenue' },
  { name: 'logo_file', label: 'Center logo', type: 'file' },
]

export default function SettingsPage() {
  const { data: items = [], isLoading } = useSupabaseCollection<SettingsRecord>('settings', () => settingsService.list({ orderBy: 'created_at', ascending: false }))
  const createMutation = useSupabaseMutation<SettingsRecord, Partial<SettingsRecord>>(['settings'], (payload) => settingsService.create(payload))
  const updateMutation = useSupabaseMutation<SettingsRecord, { id: string; payload: Partial<SettingsRecord> }>(['settings'], ({ id, payload }) => settingsService.update(id, payload))

  const handleSave = async (payload: Record<string, unknown>, id?: string) => {
    const file = payload.logo_file as File | undefined
    const recordPayload: Partial<SettingsRecord> = {
      center_name: String(payload.center_name ?? ''),
      tagline: payload.tagline ? String(payload.tagline) : undefined,
      language: payload.language ? String(payload.language) : undefined,
      timezone: payload.timezone ? String(payload.timezone) : undefined,
      website_title: payload.website_title ? String(payload.website_title) : undefined,
      maintenance_mode: payload.maintenance_mode ? String(payload.maintenance_mode) : undefined,
      facebook: payload.facebook ? String(payload.facebook) : undefined,
      linkedin: payload.linkedin ? String(payload.linkedin) : undefined,
      phone: payload.phone ? String(payload.phone) : undefined,
      email: payload.email ? String(payload.email) : undefined,
      address: payload.address ? String(payload.address) : undefined,
    }

    if (file instanceof File) {
      const path = `logos/${Date.now()}-${file.name}`
      await uploadFile('logos', path, file)
      recordPayload.logo_url = getPublicUrl('logos', path)
    }

    if (id) {
      await updateMutation.mutateAsync({ id, payload: recordPayload })
      return
    }

    await createMutation.mutateAsync(recordPayload)
  }

  const handleDelete = async (id: string) => {
    await settingsService.remove(id)
  }

  return (
    <ModulePage<SettingsRecord>
      title="Settings"
      subtitle="Update center settings, contact details, and upload the official logo."
      breadcrumb={['Admin', 'Settings']}
      items={items}
      columns={columns}
      addLabel="Add settings"
      formTitle="Add settings"
      formDescription="Save basic site settings and brand assets for the center."
      formFields={formFields}
      formSchema={schema}
      initialValues={{
        center_name: '',
        tagline: '',
        language: '',
        timezone: '',
        website_title: '',
        maintenance_mode: '',
        facebook: '',
        linkedin: '',
        phone: '',
        email: '',
        address: '',
      }}
      loading={isLoading}
      onSubmit={handleSave}
      onDelete={handleDelete}
      saveLabel="Save settings"
    />
  )
}
