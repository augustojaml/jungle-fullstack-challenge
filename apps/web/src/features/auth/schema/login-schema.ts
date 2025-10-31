import z from 'zod'

const loginSchema = z.object({
  email: z.email({ message: 'Email must be a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(8, { message: 'Password must be at most 8 characters long' }),
})

type LoginParamsDto = z.infer<typeof loginSchema>

export { type LoginParamsDto, loginSchema }
