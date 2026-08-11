import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'

const schema = z.object({
  centerName: z.string().min(2, 'Center name is required'),
  tagline: z.string().min(2, 'Tagline is required'),
  language: z.string().min(1, 'Language is required'),
  timezone: z.string().min(1, 'Timezone is required'),
  websiteTitle: z.string().min(2, 'Website title is required'),
  maintenanceMode: z.string().min(1, 'Maintenance mode is required'),
  facebook: z.string().min(1, 'Facebook URL is required'),
  linkedin: z.string().min(1, 'LinkedIn URL is required'),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email('Valid email is required'),
  address: z.string().min(2, 'Address is required'),
})

export default function SettingsPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema), defaultValues: { centerName: 'TARC Center', tagline: 'Research, education, and community impact', language: 'English', timezone: 'WAT', websiteTitle: 'TARCMS Portal', maintenanceMode: 'Off', facebook: 'https://facebook.com/tarc', linkedin: 'https://linkedin.com/company/tarc', phone: '+234 800 000 0000', email: 'info@tarc.gov', address: 'Abuja, Nigeria' } })

  const onSubmit = () => undefined

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-white">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-300">System Preferences</p>
        <h1 className="mt-3 text-3xl font-semibold">Settings</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">Configure the institution profile, website defaults, contact information, and presentation theme.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Card title="General" subtitle="Core center identity and language defaults">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Center name" error={errors.centerName?.message?.toString()} {...register('centerName')} />
            <Input label="Tagline" error={errors.tagline?.message?.toString()} {...register('tagline')} />
            <Select label="Language" error={errors.language?.message?.toString()} {...register('language')}>
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
            </Select>
            <Select label="Timezone" error={errors.timezone?.message?.toString()} {...register('timezone')}>
              <option value="WAT">WAT</option>
              <option value="GMT">GMT</option>
            </Select>
          </div>
        </Card>

        <Card title="Center Information" subtitle="Institution profile details">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Website title" error={errors.websiteTitle?.message?.toString()} {...register('websiteTitle')} />
            <Select label="Maintenance mode" error={errors.maintenanceMode?.message?.toString()} {...register('maintenanceMode')}>
              <option value="Off">Off</option>
              <option value="On">On</option>
            </Select>
            <Textarea label="Address" className="md:col-span-2" error={errors.address?.message?.toString()} {...register('address')} />
          </div>
        </Card>

        <Card title="Website Settings" subtitle="Public-facing defaults and structure">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Facebook" error={errors.facebook?.message?.toString()} {...register('facebook')} />
            <Input label="LinkedIn" error={errors.linkedin?.message?.toString()} {...register('linkedin')} />
          </div>
        </Card>

        <Card title="Contact Information" subtitle="Primary communication channels">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Phone" error={errors.phone?.message?.toString()} {...register('phone')} />
            <Input label="Email" type="email" error={errors.email?.message?.toString()} {...register('email')} />
          </div>
        </Card>

        <Card title="Theme" subtitle="Visual direction and interface preferences">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Accent color" defaultValue="Primary green" />
            <Select label="Surface style" defaultValue="Modern">
              <option value="Modern">Modern</option>
              <option value="Minimal">Minimal</option>
            </Select>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">Save settings</Button>
        </div>
      </form>
    </section>
  )
}
