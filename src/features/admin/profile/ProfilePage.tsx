import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  title: z.string().min(2, 'Title is required'),
  email: z.string().email('Valid email is required'),
  bio: z.string().min(2, 'Bio is required'),
})

const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password is required'),
}).refine((values) => values.newPassword === values.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] })

export default function ProfilePage() {
  const { register: registerProfile, handleSubmit: handleProfileSubmit, formState: { errors: profileErrors } } = useForm({ resolver: zodResolver(profileSchema), defaultValues: { fullName: 'Adele Nwosu', title: 'Senior Administrator', email: 'adele@tarc.gov', bio: 'Coordinates operations and policy oversight for the center.' } })
  const { register: registerPassword, handleSubmit: handlePasswordSubmit, formState: { errors: passwordErrors } } = useForm({ resolver: zodResolver(passwordSchema), defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' } })

  const onProfileSubmit = () => undefined
  const onPasswordSubmit = () => undefined

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-white">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Account Overview</p>
        <h1 className="mt-3 text-3xl font-semibold">Profile</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">Review the profile card, update contact details, and manage password settings without touching the backend.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card title="Profile Card" subtitle="Current account summary">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-semibold text-primary">AN</div>
            <h2 className="mt-4 text-xl font-semibold text-slate-900">Adele Nwosu</h2>
            <p className="mt-1 text-sm text-slate-500">Senior Administrator</p>
            <Badge variant="success" className="mt-4">Active account</Badge>
            <div className="mt-5 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left text-sm text-slate-600">
              <p><span className="font-semibold text-slate-800">Department:</span> Operations</p>
              <p className="mt-2"><span className="font-semibold text-slate-800">Email:</span> adele@tarc.gov</p>
              <p className="mt-2"><span className="font-semibold text-slate-800">Role:</span> Lead coordinator</p>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card title="Profile Information" subtitle="Update personal details and public summary">
            <form className="space-y-4" onSubmit={handleProfileSubmit(onProfileSubmit)}>
              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Full name" error={profileErrors.fullName?.message?.toString()} {...registerProfile('fullName')} />
                <Input label="Title" error={profileErrors.title?.message?.toString()} {...registerProfile('title')} />
                <Input label="Email" type="email" error={profileErrors.email?.message?.toString()} {...registerProfile('email')} />
                <Input label="Department" defaultValue="Operations" />
              </div>
              <Textarea label="Bio" error={profileErrors.bio?.message?.toString()} {...registerProfile('bio')} />
              <div className="flex justify-end">
                <Button type="submit">Save profile</Button>
              </div>
            </form>
          </Card>

          <Card title="Change Password" subtitle="Secure your account with a fresh password">
            <form className="space-y-4" onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
              <Input label="Current password" type="password" error={passwordErrors.currentPassword?.message?.toString()} {...registerPassword('currentPassword')} />
              <Input label="New password" type="password" error={passwordErrors.newPassword?.message?.toString()} {...registerPassword('newPassword')} />
              <Input label="Confirm password" type="password" error={passwordErrors.confirmPassword?.message?.toString()} {...registerPassword('confirmPassword')} />
              <div className="flex justify-end">
                <Button type="submit">Update password</Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
