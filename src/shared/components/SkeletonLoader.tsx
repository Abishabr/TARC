import { type HTMLAttributes } from 'react'
import { cn } from '../utils/cn'

type SkeletonLoaderProps = HTMLAttributes<HTMLDivElement>

export function SkeletonLoader({ className, ...props }: SkeletonLoaderProps) {
  return <div className={cn('animate-pulse rounded-2xl bg-neutral-200', className)} {...props} />
}
