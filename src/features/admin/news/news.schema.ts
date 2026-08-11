import { z } from 'zod'

export const newsSchema = z.object({
  id: z.string(),
})
