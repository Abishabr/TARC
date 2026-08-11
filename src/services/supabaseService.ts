import { supabase } from '@/lib/api/supabase'
import type {
  DepartmentRecord,
  EventRecord,
  GalleryRecord,
  MessageRecord,
  NewsRecord,
  ProjectRecord,
  PublicationRecord,
  ResearchProgramRecord,
  SettingsRecord,
  StaffRecord,
  VehicleRecord,
} from '@/types/domain'

export type BaseRecord = {
  id?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string | null
}

type QueryOptions = {
  limit?: number
  orderBy?: string
  ascending?: boolean
  filters?: Record<string, string | number | boolean | null>
}

export function createCrudService<T extends BaseRecord>(table: string) {
  return {
    async list(options: QueryOptions = {}) {
      let query = supabase.from(table).select('*').is('deleted_at', null)

      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          if (value === null) {
            query = query.is(key, null)
          } else {
            query = query.eq(key, value)
          }
        })
      }

      if (options.orderBy) {
        query = query.order(options.orderBy, { ascending: options.ascending ?? false })
      }

      if (options.limit) {
        query = query.limit(options.limit)
      }

      const { data, error } = await query
      if (error) throw error
      return (data ?? []) as T[]
    },

    async getById(id: string) {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).is('deleted_at', null).maybeSingle()
      if (error) throw error
      return data as T | null
    },

    async create(payload: Partial<T>) {
      const { data, error } = await supabase.from(table).insert([{ ...payload, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }]).select('*').single()
      if (error) throw error
      return data as T
    },

    async update(id: string, payload: Partial<T>) {
      const { data, error } = await supabase.from(table).update({ ...payload, updated_at: new Date().toISOString() }).eq('id', id).select('*').single()
      if (error) throw error
      return data as T
    },

    async remove(id: string) {
      const { error } = await supabase.from(table).update({ deleted_at: new Date().toISOString() }).eq('id', id)
      if (error) throw error
      return true
    },
  }
}

export const staffService = createCrudService<StaffRecord>('staff')
export const departmentsService = createCrudService<DepartmentRecord>('departments')
export const researchProgramsService = createCrudService<ResearchProgramRecord>('research_programs')
export const projectsService = createCrudService<ProjectRecord>('projects')
export const publicationsService = createCrudService<PublicationRecord>('publications')
export const newsService = createCrudService<NewsRecord>('news')
export const eventsService = createCrudService<EventRecord>('events')
export const galleryService = createCrudService<GalleryRecord>('gallery')
export const vehiclesService = createCrudService<VehicleRecord>('vehicles')
export const messagesService = createCrudService<MessageRecord>('messages')
export const settingsService = createCrudService<SettingsRecord>('settings')
