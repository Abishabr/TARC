import { supabase } from '@/lib/api/supabase'

export async function uploadFile(bucket: string, path: string, file: File) {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true })
  if (error) throw error
  return data
}

export function getPublicUrl(bucket: string, path: string) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
