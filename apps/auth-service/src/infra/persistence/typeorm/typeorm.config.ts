import { join } from 'node:path'

import { DataSource, DataSourceOptions } from 'typeorm'

import { envConfig } from '@/shared/env/env'

export const typeormOptions: DataSourceOptions = {
  type: 'postgres',
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT,
  username: envConfig.DB_USER,
  password: envConfig.DB_PASS,
  database: envConfig.DB_NAME,
  synchronize: false,
  entities: [join(__dirname, 'entities', '*.{ts,js}')], // <== só ORM
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  logging: ['error', 'warn'],
}

export const typeormDataSource = new DataSource(typeormOptions)
