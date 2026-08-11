import { z } from 'zod'

export const publicationsSchema = z.object({
  id: z.string(),
})
