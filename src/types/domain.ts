export interface BaseRecord {
  id?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string | null
  [key: string]: unknown
}

export interface StaffRecord extends BaseRecord {
  first_name: string
  last_name: string
  email?: string
  role?: string
  department?: string
  status?: string
  avatar_url?: string | null
}

export interface DepartmentRecord extends BaseRecord {
  name: string
  lead?: string
  focus?: string
  status?: string
}

export interface ResearchProgramRecord extends BaseRecord {
  title: string
  manager?: string
  focus?: string
  status?: string
}

export interface ProjectRecord extends BaseRecord {
  title: string
  owner?: string
  deadline?: string
  status?: string
  image_url?: string | null
}

export interface PublicationRecord extends BaseRecord {
  title: string
  author?: string
  category?: string
  status?: string
  file_url?: string | null
}

export interface NewsRecord extends BaseRecord {
  headline: string
  author?: string
  category?: string
  status?: string
}

export interface EventRecord extends BaseRecord {
  title: string
  date?: string
  venue?: string
  status?: string
}

export interface GalleryRecord extends BaseRecord {
  title: string
  category?: string
  upload_date?: string
  visibility?: string
  image_url?: string | null
}

export interface VehicleRecord extends BaseRecord {
  plate: string
  driver?: string
  department?: string
  status?: string
}

export interface MessageRecord extends BaseRecord {
  sender: string
  subject?: string
  priority?: string
  status?: string
}

export interface SettingsRecord extends BaseRecord {
  center_name?: string
  tagline?: string
  language?: string
  timezone?: string
  website_title?: string
  maintenance_mode?: string
  facebook?: string
  linkedin?: string
  phone?: string
  email?: string
  address?: string
  logo_url?: string | null
}
