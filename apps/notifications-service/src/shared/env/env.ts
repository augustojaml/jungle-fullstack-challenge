import { z } from 'zod'

const schema = z.object({
  PORT: z.coerce.number().default(3004),
  RABBITMQ_URL: z.string().default('amqp://admin:admin@localhost:5672'),
})

const _env = schema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const envConfig = _env.data
