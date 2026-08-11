import { useMemo, useState } from 'react'
import { Filter, Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Select } from '@/components/ui/Select'
import { Spinner } from '@/components/ui/Spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Textarea } from '@/components/ui/Textarea'
import { cn } from '@/lib/utils'

type FormField = {
  name: string
  label: string
  type?: 'text' | 'email' | 'select' | 'textarea' | 'number' | 'file' | 'date' | string
  placeholder?: string
  options?: Array<{ label: string; value: string }>
}

type Column<T> = {
  key: keyof T | string
  label: string
  render?: (item: T) => React.ReactNode
  className?: string
}

type ModulePageProps<T extends Record<string, unknown>> = {
  title: string
  subtitle: string
  breadcrumb: string[]
  items: T[]
  columns: ReadonlyArray<Column<T>>
  addLabel: string
  formTitle: string
  formDescription?: string
  formFields: FormField[]
  formSchema: z.ZodTypeAny
  initialValues?: Record<string, unknown>
  emptyMessage?: string
  loading?: boolean
  onSubmit?: (payload: Record<string, unknown>, id?: string) => Promise<void>
  onDelete?: (id: string) => Promise<void>
  saveLabel?: string
}

export default function ModulePage<T extends Record<string, unknown>>({
  title,
  subtitle,
  breadcrumb,
  items,
  columns,
  addLabel,
  formTitle,
  formDescription,
  formFields,
  formSchema,
  initialValues = {},
  emptyMessage = 'No records available yet.',
  loading = false,
  onSubmit,
  onDelete,
  saveLabel,
}: ModulePageProps<T>) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<T | null>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const pageSize = 5

  const filteredItems = useMemo(() => {
    const q = query.toLowerCase()
    return items.filter((item) => Object.values(item).some((value) => String(value).toLowerCase().includes(q)))
  }, [items, query])

  const pagedItems = useMemo(() => filteredItems.slice((page - 1) * pageSize, page * pageSize), [filteredItems, page])

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  })

  const openModal = (item: T | null = null) => {
    setSelectedItem(item)
    setIsModalOpen(true)
    if (item) {
      reset(item as Record<string, unknown>)
    } else {
      reset(initialValues)
    }
  }

  const handleFormSubmit = async (data: Record<string, unknown>) => {
    if (!onSubmit) {
      setIsModalOpen(false)
      reset(initialValues)
      return
    }

    setActionLoading(true)
    setStatusMessage(null)

    try {
      const payload = Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
          if (value instanceof FileList) {
            return [key, value.length ? value[0] : undefined]
          }
          return [key, value]
        }),
      )

      await onSubmit(payload, selectedItem?.id as string | undefined)
      setStatusMessage({ type: 'success', text: selectedItem ? 'Updated successfully.' : 'Created successfully.' })
      setIsModalOpen(false)
      setSelectedItem(null)
      reset(initialValues)
    } catch (error) {
      setStatusMessage({ type: 'error', text: error instanceof Error ? error.message : 'Unable to save changes.' })
    } finally {
      setActionLoading(false)
    }
  }

  const handleDelete = async (item: T) => {
    if (!onDelete || !item.id || typeof item.id !== 'string') {
      return
    }

    if (!window.confirm('Delete this record? This action cannot be undone.')) {
      return
    }

    setActionLoading(true)
    setStatusMessage(null)

    try {
      await onDelete(item.id)
      setStatusMessage({ type: 'success', text: 'Record deleted successfully.' })
      setPage(1)
    } catch (error) {
      setStatusMessage({ type: 'error', text: error instanceof Error ? error.message : 'Unable to delete record.' })
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-sm lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm text-slate-300">
            {breadcrumb.map((crumb, index) => (
              <span key={crumb} className="flex items-center gap-2">
                {crumb}
                {index < breadcrumb.length - 1 ? <span>/</span> : null}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">{subtitle}</p>
        </div>
        <Button variant="secondary" className="border-slate-700 bg-white/10 text-white hover:bg-white/20" onClick={() => openModal(null)}>
          {addLabel}
        </Button>
      </div>

      <Card>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row">
            <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:min-w-[280px]">
              <Search className="h-4 w-4" />
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setPage(1)
                }}
                placeholder="Search records"
                className="w-full bg-transparent outline-none"
              />
            </label>
            <Button variant="secondary" className="w-full md:w-auto">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>
          <Button onClick={() => openModal(null)} className="w-full lg:w-auto">
            <Plus className="mr-2 h-4 w-4" /> {addLabel}
          </Button>
        </div>
      </Card>

      {statusMessage ? (
        <Card className={statusMessage.type === 'success' ? 'border-green-200 bg-green-50' : 'border-rose-200 bg-rose-50'}>
          <p className={statusMessage.type === 'success' ? 'text-green-700' : 'text-rose-700'}>{statusMessage.text}</p>
        </Card>
      ) : null}

      {loading ? (
        <Card className="flex min-h-[240px] items-center justify-center">
          <div className="flex items-center gap-3 text-slate-600">
            <Spinner />
            <span>Loading records…</span>
          </div>
        </Card>
      ) : filteredItems.length === 0 ? (
        <Card className="flex min-h-[240px] items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-medium text-slate-800">{emptyMessage}</p>
            <p className="mt-2 text-sm text-slate-500">Use the add button to create a new entry.</p>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Records</h2>
              <p className="text-sm text-slate-500">Showing {pagedItems.length} of {filteredItems.length} items</p>
            </div>
            <Badge variant="info">Live preview</Badge>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableHeader key={String(column.key)}>{column.label}</TableHeader>
                ))}
                <TableHeader className="text-right">Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {pagedItems.map((item, index) => (
                <TableRow key={`${String(item[columns[0]?.key] ?? 'row')}-${index}`}>
                  {columns.map((column) => (
                    <TableCell key={String(column.key)} className={column.className}>
                      {column.render ? column.render(item) : String(item[column.key] ?? '')}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" disabled>
                        View
                      </Button>
                      {onSubmit ? (
                        <Button variant="secondary" size="sm" onClick={() => openModal(item)}>
                          Edit
                        </Button>
                      ) : null}
                      {onDelete ? (
                        <Button variant="ghost" size="sm" className="text-rose-600 hover:bg-rose-50" onClick={() => handleDelete(item)}>
                          Delete
                        </Button>
                      ) : null}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">Page {page} of {Math.max(1, Math.ceil(filteredItems.length / pageSize))}</p>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setPage((current) => current + 1)} disabled={page >= Math.ceil(filteredItems.length / pageSize)}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Modal open={isModalOpen} title={formTitle} description={formDescription} onClose={() => setIsModalOpen(false)}>
        <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid gap-4 md:grid-cols-2">
            {formFields.map((field) => {
              const fieldError = errors[field.name]?.message
              if (field.type === 'textarea') {
                return (
                  <div key={field.name} className="md:col-span-2">
                    <Textarea label={field.label} placeholder={field.placeholder} error={fieldError ? String(fieldError) : undefined} {...register(field.name)} />
                  </div>
                )
              }
              if (field.type === 'select') {
                return (
                  <Select key={field.name} label={field.label} error={fieldError ? String(fieldError) : undefined} {...register(field.name)}>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                )
              }
              if (field.type === 'file') {
                return (
                  <div key={field.name} className="md:col-span-2">
                    <label className="flex flex-col gap-2 text-sm text-slate-700">
                      <span className="font-medium">{field.label}</span>
                      <input
                        type="file"
                        {...register(field.name)}
                        className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                      {fieldError ? <span className="text-xs text-rose-600">{String(fieldError)}</span> : null}
                    </label>
                  </div>
                )
              }
              return <Input key={field.name} label={field.label} type={field.type ?? 'text'} placeholder={field.placeholder} error={fieldError ? String(fieldError) : undefined} {...register(field.name)} />
            })}
          </div>
          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={actionLoading}>
              {actionLoading ? 'Saving...' : saveLabel ?? (selectedItem ? 'Save changes' : 'Save record')}
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  )
}
