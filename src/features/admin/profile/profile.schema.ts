import { z } from 'zod'

export const profileSchema = z.object({
  id: z.string(),
})
