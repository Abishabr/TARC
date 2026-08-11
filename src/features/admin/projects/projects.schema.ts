import { z } from 'zod'

export const projectsSchema = z.object({
  id: z.string(),
})
