import { ReactNode } from 'react'
import { Header } from '../navigation/Header'
import { Footer } from './Footer'

interface PublicLayoutProps {
  children: ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  )
}
