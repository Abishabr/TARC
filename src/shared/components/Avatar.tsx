import { type ReactNode } from 'react'
import { cn } from '../utils/cn'

type AvatarProps = {
  src?: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children?: ReactNode
}

const sizeClasses: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-14 w-14 text-lg',
}

export function Avatar({ src, alt, size = 'md', className, children }: AvatarProps) {
  return src ? (
    <img src={src} alt={alt} className={cn('rounded-full object-cover', sizeClasses[size], className)} />
  ) : (
    <div className={cn('inline-flex items-center justify-center rounded-full bg-neutral-200 text-neutral-700', sizeClasses[size], className)}>
      {children ?? alt.charAt(0).toUpperCase()}
    </div>
  )
}
