import { useState, type ReactNode } from 'react'
import { cn } from '../utils/cn'

type AccordionItem = {
  title: string
  content: ReactNode
}

type AccordionProps = {
  items: AccordionItem[]
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={item.title} className="rounded-3xl border border-neutral-200 bg-white">
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-neutral-900"
          >
            <span>{item.title}</span>
            <span>{openIndex === index ? '−' : '+'}</span>
          </button>
          {openIndex === index ? <div className="px-4 pb-4 pt-2 text-neutral-600">{item.content}</div> : null}
        </div>
      ))}
    </div>
  )
}
