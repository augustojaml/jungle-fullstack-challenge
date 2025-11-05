import { z } from 'zod'

const schema = z.object({
  AUTH_SERVICE_JWT_SECRET: z.string().default('meu_segredo_super_secreto'),
  WS_PATH: z.string().default('/ws'),
  PORT: z.coerce.number().default(3001),
  AUTH_SERVICE_URL: z.string().default('http://localhost:3002'),
  TASK_SERVICE_URL: z.string().default('http://localhost:3003'),
  RABBITMQ_URL: z.string().default('amqp://admin:admin@rabbitmq:5672'),
})

const _env = schema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const envConfig = _env.data
