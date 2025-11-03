import { join } from 'node:path'

import { DataSource, DataSourceOptions } from 'typeorm'

export const typeormOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASS ?? 'password',
  database: process.env.DB_NAME ?? 'challenge_db',
  synchronize: false,
  entities: [join(__dirname, 'entities', '*.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  logging: ['error', 'warn'],
}

export const typeormDataSource = new DataSource(typeormOptions)
