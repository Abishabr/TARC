import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { getSession, signIn, signOut, signUp, resetPassword, updatePassword } from '@/lib/auth/auth'
import { supabase } from '@/lib/api/supabase'

type AuthContextValue = {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string, metadata?: Record<string, unknown>) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: Error | null }>
  updatePassword: (password: string) => Promise<{ error: Error | null }>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let subscription: { data: { subscription: { unsubscribe: () => void } } } | undefined

    const initialize = async () => {
      const { data } = await getSession()
      setSession(data.session)
      setUser(data.session?.user ?? null)
      setLoading(false)

      subscription = supabase.auth.onAuthStateChange((_event: string, authSession: Session | null) => {
        setSession(authSession)
        setUser(authSession?.user ?? null)
      })
    }

    initialize()

    return () => {
      subscription?.data.subscription.unsubscribe()
    }
  }, [])

  const value = useMemo<AuthContextValue>(() => ({
    user,
    session,
    loading,
    signIn: async (email, password) => {
      const response = await signIn(email, password)
      setSession(response.data.session)
      setUser(response.data.user)
      return { error: response.error as Error | null }
    },
    signUp: async (email, password, metadata) => {
      const response = await signUp(email, password, metadata)
      setSession(response.data.session)
      setUser(response.data.user)
      return { error: response.error as Error | null }
    },
    signOut: async () => {
      await signOut()
      setSession(null)
      setUser(null)
    },
    resetPassword: async (email) => {
      const response = await resetPassword(email)
      return { error: response.error as Error | null }
    },
    updatePassword: async (password) => {
      const response = await updatePassword(password)
      return { error: response.error as Error | null }
    },
  }), [loading, session, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
