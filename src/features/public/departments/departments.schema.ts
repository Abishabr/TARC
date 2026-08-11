import { z } from 'zod'

export const departmentsSchema = z.object({
  id: z.string(),
})
