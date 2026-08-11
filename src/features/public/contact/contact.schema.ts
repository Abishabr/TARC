import { z } from 'zod'

export const contactSchema = z.object({
  id: z.string(),
})
