import { type HTMLAttributes } from 'react'
import { cn } from '../utils/cn'

type SkeletonProps = HTMLAttributes<HTMLDivElement>

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn('animate-pulse rounded-2xl bg-neutral-200', className)} {...props} />
}
