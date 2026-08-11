import { z } from 'zod'

export const eventsSchema = z.object({
  id: z.string(),
})
