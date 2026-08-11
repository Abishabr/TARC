import { z } from 'zod'

export const vehicleSchema = z.object({
  id: z.string(),
  registrationNumber: z.string().min(1),
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().int().min(1900),
  status: z.enum(['Available', 'In Use', 'Maintenance', 'Reserved']),
  department: z.string().min(1),
  driver: z.string().min(1),
  lastServiceDate: z.string().min(1),
})

export const vehiclesSchema = z.array(vehicleSchema)
