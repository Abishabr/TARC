import { z } from 'zod'

export const staffSchema = z.object({
  id: z.string(),
})
