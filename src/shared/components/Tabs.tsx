import { type ReactNode, useState } from 'react'
import { cn } from '../utils/cn'

type TabItem = {
  label: string
  value: string
  content: ReactNode
}

type TabsProps = {
  items: TabItem[]
  initialValue?: string
}

export function Tabs({ items, initialValue }: TabsProps) {
  const [active, setActive] = useState(initialValue ?? items[0]?.value)
  const activeItem = items.find((item) => item.value === active)

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setActive(item.value)}
            className={cn(
              'rounded-full px-4 py-2 text-sm transition',
              active === item.value ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div>{activeItem?.content}</div>
    </div>
  )
}
