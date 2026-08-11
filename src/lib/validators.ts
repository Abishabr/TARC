import { z } from 'zod'

export const emailSchema = z.string().email('Please enter a valid email address')
export const requiredString = z.string().min(1, 'This field is required')
