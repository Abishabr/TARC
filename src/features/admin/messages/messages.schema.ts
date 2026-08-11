import { z } from 'zod'

export const messagesSchema = z.object({
  id: z.string(),
})
