create extension if not exists pgcrypto;

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  role text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create table if not exists public.staff (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text unique,
  role text,
  department text,
  status text default 'Active',
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  lead text,
  focus text,
  status text default 'Active',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create table if not exists public.research_programs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  manager text,
  focus text,
  status text default 'Active',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  owner text,
  deadline text,
  status text default 'In progress',
  image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create table if not exists public.publications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text,
  category text,
  status text default 'Draft',
  file_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  headline text not null,
  author text,
  category text,
  status text default 'Draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date text,
  venue text,
  status text default 'Scheduled',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  upload_date text,
  visibility text default 'Public',
  image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  plate text not null,
  driver text,
  department text,
  status text default 'In service',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender text not null,
  subject text,
  priority text default 'Medium',
  status text default 'Unread',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  center_name text,
  tagline text,
  language text,
  timezone text,
  website_title text,
  maintenance_mode text,
  facebook text,
  linkedin text,
  phone text,
  email text,
  address text,
  logo_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create index if not exists idx_staff_deleted_at on public.staff (deleted_at);
create index if not exists idx_departments_deleted_at on public.departments (deleted_at);
create index if not exists idx_research_programs_deleted_at on public.research_programs (deleted_at);
create index if not exists idx_projects_deleted_at on public.projects (deleted_at);
create index if not exists idx_publications_deleted_at on public.publications (deleted_at);
create index if not exists idx_news_deleted_at on public.news (deleted_at);
create index if not exists idx_events_deleted_at on public.events (deleted_at);
create index if not exists idx_gallery_deleted_at on public.gallery (deleted_at);
create index if not exists idx_vehicles_deleted_at on public.vehicles (deleted_at);
create index if not exists idx_messages_deleted_at on public.messages (deleted_at);
create index if not exists idx_settings_deleted_at on public.settings (deleted_at);
