import { FactoryProvider } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import * as postgres from 'postgres'
import { DefaultLogger, LogWriter } from 'drizzle-orm'
import { ConfigService } from '@nestjs/config'

export const DB = Symbol('DB_SERVICE')
export type DbType = PostgresJsDatabase

export const DbProvider: FactoryProvider = {
  provide: DB,
  inject: [ConfigService],
  useFactory: async (consfigService: ConfigService) => {
    const logger = new Logger('DB')

    logger.log('👉👉 conneting to db!')

    const connectionString = consfigService.get<string>('DATABASE_URL')!

    const client = postgres(connectionString, { ssl: 'require' })

    logger.log('🤝🤝  Connected to db!')

    class CustomDbLogWriter implements LogWriter {
      write(message: string) {
        logger.log(message)
      }
    }

    return drizzle(client, {
      logger: new DefaultLogger({ writer: new CustomDbLogWriter() })
    })
  }
}
