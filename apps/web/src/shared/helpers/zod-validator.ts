import { z } from 'zod'

const zodValidator = {
  email: () => {
    return z
      .email({ message: 'Invalid email format.' })
      .min(1, { message: 'Email is required.' })
  },

  password: ({ min = 6, max = 8 }: { min?: number; max?: number } = {}) => {
    return z
      .string()
      .min(min, { message: `Password must be at least ${min} characters.` })
      .max(max, { message: `Password must be at most ${max} characters.` })
  },

  string: (field: string) => {
    return z
      .string()
      .min(1, { message: `${field} is required and cannot be empty.` })
  },

  number: (field: string) => {
    return z.coerce
      .number()
      .refine((v) => !Number.isNaN(v), { message: `${field} is required.` })
      .int({ message: `${field} must be an integer.` })
      .min(1, { message: `${field} must be at least 1.` })
  },

  enum: (filed: string, values: string[]) => {
    return z.enum(values, {
      message: `${filed} is required and cannot be empty.`,
    })
  },
}

export { zodValidator }
