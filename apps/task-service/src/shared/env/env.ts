import { z } from 'zod'

const schema = z.object({
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().default(5432),
  DB_USER: z.string().default('postgres'),
  DB_PASS: z.string().default('password'),
  DB_NAME: z.string().default('challenge_db'),
  PORT: z.coerce.number().default(3003),
  RABBITMQ_URL: z.string().default('amqp://admin:admin@localhost:5672'),
})

const _env = schema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const envConfig = _env.data
