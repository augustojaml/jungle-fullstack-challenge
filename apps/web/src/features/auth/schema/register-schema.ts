import z from 'zod'

const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name must be at most 50 characters long' }),
  email: z.email({ message: 'Email must be a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(8, { message: 'Password must be at most 8 characters long' }),
})

type RegisterParamsDto = z.infer<typeof registerSchema>

export { type RegisterParamsDto, registerSchema }
