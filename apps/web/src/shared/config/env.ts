import { z } from 'zod'

const schema = z.object({
  VITE_API_URL: z.string().default(' http://192.168.1.19:3001'),
  VITE_APP_NAME: z.string().default('TaskIntelligence'),
  VITE_APP_ENVIRONMENT: z
    .enum(['development', 'production'])
    .default('development'),
  VITE_WS_URL: z.string().default('http://192.168.1.19:3001'),
})

const _env = schema.safeParse(import.meta.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const envConfig = _env.data
