import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password is required'),
})

const forgotSchema = z.object({
  email: z.string().email('Enter a valid email'),
})

export default function LoginPage() {
  const navigate = useNavigate()
  const { user, loading, signIn, resetPassword } = useAuth()
  const [mode, setMode] = useState<'login' | 'forgot'>('login')
  const [message, setMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const formSchema = useMemo(() => (mode === 'login' ? loginSchema : forgotSchema), [mode])
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard', { replace: true })
    }
  }, [loading, user, navigate])

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    setMessage(null)
    setErrorMessage(null)
    const response = await signIn(data.email, data.password)
    if (response.error) {
      setErrorMessage(response.error.message)
      return
    }
    setMessage('Welcome back. Redirecting to your dashboard…')
    navigate('/dashboard')
  }

  const handleForgot = async (data: z.infer<typeof forgotSchema>) => {
    setMessage(null)
    setErrorMessage(null)
    const response = await resetPassword(data.email)
    if (response.error) {
      setErrorMessage(response.error.message)
      return
    }
    setMessage('If that email exists, a reset link has been sent.')
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md">
        <Card className="space-y-6 p-8">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">{mode === 'login' ? 'Admin login' : 'Forgot password'}</h1>
            <p className="mt-2 text-sm text-slate-500">
              {mode === 'login'
                ? 'Sign in with your Supabase administrator account.'
                : 'Enter your registered email to receive a password reset link.'}
            </p>
          </div>

          {message ? <div className="rounded-3xl border border-green-200 bg-green-50 p-4 text-green-700">{message}</div> : null}
          {errorMessage ? <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4 text-rose-700">{errorMessage}</div> : null}

          <form
            className="space-y-4"
            onSubmit={handleSubmit((data) => {
              if (mode === 'login') {
                return handleLogin(data as z.infer<typeof loginSchema>)
              }
              return handleForgot(data as z.infer<typeof forgotSchema>)
            })}
          >
            <Input
              label="Email address"
              type="email"
              placeholder="name@tarc.gov"
              error={errors.email?.message ? String(errors.email?.message) : undefined}
              {...register('email')}
            />

            {mode === 'login' ? (
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                error={errors.password?.message ? String(errors.password?.message) : undefined}
                {...register('password')}
              />
            ) : null}

            <div className="flex items-center justify-between gap-4">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {mode === 'login' ? 'Sign in' : 'Send reset email'}
              </Button>
              <button
                type="button"
                className="text-sm text-slate-600 underline underline-offset-2 hover:text-slate-900"
                onClick={() => {
                  setMode(mode === 'login' ? 'forgot' : 'login')
                  setMessage(null)
                  setErrorMessage(null)
                }}
              >
                {mode === 'login' ? 'Forgot password?' : 'Back to login'}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
