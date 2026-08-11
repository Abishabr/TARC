import { z } from 'zod'

export const dashboardSchema = z.object({
  id: z.string(),
})
