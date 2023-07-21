import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { LogLevel, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const prodLogLevels: LogLevel[] = ['log', 'error', 'warn']
  const devLogLevels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose']

  const logLevels =
    process.env.NODE_ENV === 'production' ? prodLogLevels : devLogLevels

  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
  })
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}

void bootstrap()
