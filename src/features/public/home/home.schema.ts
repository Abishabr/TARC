import { z } from 'zod'

export const homeSchema = z.object({
  id: z.string(),
})
